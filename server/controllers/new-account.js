import uuid from 'uuid';
import joi from 'joi';
import Helper from '../helpers/helpers';
import Database from '../db/db-connection';
import Validation from '../helpers/validation';


const registerUser = async (req, res) => {
  joi.validate(req.body, Validation.userSchema, Validation.validationOption, async (err, result) => {
    if (err) {
      return res.json({
        status: 400,
        error: err.details[0].message,
      });
    }

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
    const sql = `INSERT INTO user_table (id,firstname,othername,
      lastname,email,username,phone_number,registered,is_admin,password,token,confirmed)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *`;
    try {
      const { rows } = await Database.executeQuery(sql, newUser);
      if (rows) {
        return res.status(201).json({
          status: 201,
          data: rows,
        });
      }

      console.log(rows);
    } catch (error) {
      res.json({
        status: 400,
        error,
      });
    }
  });
};
export default registerUser;
