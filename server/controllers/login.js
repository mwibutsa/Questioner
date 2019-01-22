import joi from 'joi';
import Database from '../db/db-connection';
import Validation from '../helpers/validation';
import Helper from '../helpers/helpers';
import jsonWebToken from 'jsonwebtoken';

const authenticateUser = async (req, res) => {
  joi.validate(req.body, Validation.loginSchema, Validation.validationOption,
    async (err, result) => {
      if (err) {
        return res.status(500).json({
          status: 500,
          error: err,
        });
      }
      const userAccount = {
        email: result.email,
        password: result.password,
      };
      const sql = `SELECT * FROM user_table WHERE email = '${userAccount.email}'`;
      try {
        const { rows } = await Database.executeQuery(sql);
        if (Helper.comparePassword(userAccount.password, rows[0].password)) {
          req.session.userId = rows[0].id;
          req.session.username = rows[0].username;
          req.session.email = rows[0].email;
          res.status(202).json({
            status: 202,
            data: rows,
          });
        }
      } catch (error) {
        res.status(401).json({
          status: 401,
          error,
        });
      }
    });
};
export default authenticateUser;
