import joi from 'joi';
import jsonWebToken from 'jsonwebtoken';
import Database from '../db/db-connection';
import Validation from '../helpers/validation';
import Helper from '../helpers/helpers';

const authenticateUser = (req, res) => {
  joi.validate(req.body, Validation.loginSchema, Validation.validationOption).then(async (result) => {
    const userAccount = {
      email: result.email,
      password: result.password,
    };
    const sql = `SELECT * FROM user_table WHERE email = '${userAccount.email}' OR username =
     '${userAccount.email}'`;
    try {
      const { rows } = await Database.executeQuery(sql);
      if (rows.length) {
        const compared = Helper.comparePassword(userAccount.password, rows[0].password);
        if (compared) {
          const token = jsonWebToken.sign({ user: rows }, process.env.SECRETKEY);
          return res.status(202).json({ status: 202, data: rows, token });
        }
        return res.status(401).json({ status: 401, error: 'Invalid username or password' });
      }
      return res.status(401).json({ status: 401, error: 'Invalid username or password' });
    } catch (error) {
      return res.status(500).json({ status: 500, error: `Internal server error : ${error}` });
    }
  }).catch(error => res.status(400).json({ status: 400, error: [...error.details] }));
};
export default authenticateUser;
