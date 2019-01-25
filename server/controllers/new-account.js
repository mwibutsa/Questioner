import uuid from 'uuid';
import joi from 'joi';
import Helper from '../helpers/helpers';
import Database from '../db/db-connection';
import Validation from '../helpers/validation';


const registerUser = (req, res) => {
  joi.validate(req.body, Validation.userSchema, Validation.validationOption).then((result) => {
    const newUser = [
      uuid.v4(), // id
      result.firstname,
      result.othername,
      result.lastname,
      result.email,
      result.username,
      result.phoneNumber,
      new Date(), // registered on
      result.isAdmin || 0, // is_admin
      Helper.hashPassword(result.password, 12),
      'ABX#4454$', // token
      0, // confirmed
    ];
    const sql = `INSERT INTO user_table (id,firstname,othername,
      lastname,email,username,phone_number,registered,is_admin,password,token,confirmed)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *`;

    const user = Database.executeQuery(sql, newUser);
    user.then((userResult) => {
      if (userResult.rows.length) {
        return res.status(201).json({
          status: 201,
          data: userResult.rows,
        });
      }

      return res.status(400).json({
        status: 400,
        error: 'Failled to save user details',
      });
    }).catch(error => res.status(500).json({
      status: 500,
      error: `Internal server Error ${error}`,
    }));
  }).catch(error => res.status(404).json({ status: 404, error: [...error.details] }));
};
export default registerUser;
