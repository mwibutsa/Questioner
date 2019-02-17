import uuid from 'uuid';
import joi from 'joi';
import Helper from '../helpers/helpers';
import Database from '../db/db-connection';
import Validation from '../helpers/validation';
import { isUnique } from '../helpers/functions';


const registerUser = (req, res) => {
  joi.validate(req.body, Validation.userSchema, Validation.validationOption).then(async (result) => {
    const newUser = [
      uuid.v4(), // id
      result.firstname,
      result.othername,
      result.lastname,
      result.email,
      result.username,
      result.phoneNumber,
      new Date(), // registered on
      0, // is_admin
      Helper.hashPassword(result.password, 12),
      'ABX#4454$', // token
      0, // confirmed
    ];
    const newAccount = {email: result.email, username: result.username };
    const sql = `INSERT INTO user_table (id,firstname,othername,
      lastname,email,username,phone_number,registered,is_admin,password,token,confirmed)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *`;

    const unique = {
      email: await isUnique('user_table', 'email', newAccount.email),
      username: await isUnique('user_table', 'username', newAccount.username),
    };
    if (typeof unique.email === 'boolean' && typeof unique.username === 'boolean') {
      console.log( '=======', unique.email, unique.username);
      if (unique.email && unique.username) {
        const user = Database.executeQuery(sql, newUser);
        user.then((userResult) => {
          if (userResult.rows) {
            return res.status(201).json({
              status: 201,
              data: userResult.rows,
            });
          }
          console.log(userResult);
          return res.status(400).json({
            status: 400,
            error: 'Failled to save user details',
          });
        }).catch(error => res.status(500).json({
          status: 500,
          error: `Internal server Error ${error}`,
        }));
      } else if (!(unique.email)) {
        return res.status(400)
          .json({ status: 400, error: 'Email is already in use' });
      } else if (!(unique.username)) {
        return res.status(400)
          .json({ status: 400, error: 'Username is already in use' });
      }
    } else {
      return res.status(500).json({ status: 500, error: `Error: ${unique.email}, ${unique.username}` });
    }
  }).catch(error => res.status(404).json({ status: 404, error: error.details }));
};
export default registerUser;
