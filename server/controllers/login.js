import joi from 'joi';
import jsonWebToken from 'jsonwebtoken';
import Database from '../db/db-connection';
import Validation from '../helpers/validation';
import Helper from '../helpers/helpers';

const authenticateUser = (req, res) => {
  joi.validate(req.body, Validation.loginSchema, Validation.validationOption,
     (err, result) => {
      if (err) {
        return res.status(400).json({
          status: 400,
          error: err.details,
        });
      }
      const userAccount = {
        email: result.email,
        password: result.password,
      };
      const sql = `SELECT * FROM user_table WHERE email = '${userAccount.email}'`;
      const user = Database.executeQuery(sql);
      user.then((userResult) => {
        if (userResult.rows.length) {
          if (Helper.comparePassword(userAccount.password, userResult.rows[0].password)) {
            const token = jsonWebToken.sign({user: userResult.rows }, 'secret_@1!9(9)6^%');
            req.token = token;
            return res.status(202).json({ status: 202, data: userResult.rows, token });
          }
        }
        else {
          return res.status(403).json({ status: 403, error: 'Invalid username or password' });
        }
      }).catch(error => res.status(500).json({ status: 500, error: `Internal server error ${error}` }));
    });
};
export default authenticateUser;
