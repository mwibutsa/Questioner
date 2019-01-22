import joi from 'joi';
import jsonWebToken from 'jsonwebtoken';
import Database from '../db/db-connection';
import Validation from '../helpers/validation';
import Helper from '../helpers/helpers';

const authenticateUser = async (req, res) => {
  joi.validate(req.body, Validation.loginSchema, Validation.validationOption,
    async (err, result) => {
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
      user.then((result) => {
        if (result.rows.length) {
          if (Helper.comparePassword(userAccount.password, result.rows[0].password)) {
            const token = jsonWebToken.sign(result.rows, 'secret_@1!9(9)6^%', { expiresIn: '24h' });
            req.token = token;
            return res.status(202).json({ status: 202, data: result.rows });
          }
        }
      });
    });
};
export default authenticateUser;
