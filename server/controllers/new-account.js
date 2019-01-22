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
     
      const user = Database.executeQuery(sql, newUser);
      user.then((result) => {
        if(result.rows.length){
          return res.status(201).json({
            status:201,
            data:result.rows
          });
        }
        else{
          return res.status(400).json({
            status:400,
            error:'Failled to save user details'
          });
        }
      }).catch((error) => {
        return res.status(500).json({
          status:500,
          error:`Internal server Error ${error}`,
        });
      });
  });
};
export default registerUser;
