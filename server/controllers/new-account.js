import uuid from 'uuid';
import fs from 'fs';
import path from 'path';
import joi from 'joi';
import users from '../models/user';
import Validation from '../helpers/validation';


const registerUser = (req, res) => {
  joi.validate(req.body, Validation.userSchema, Validation.validationOption, (err, result) => {
    if (err) {
      return res.json({
        status: 400,
        error: err.details[0].message,
      });
    }

    const newUser = {
      id: uuid.v4(),
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      othername: req.body.lastname,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      username: req.body.username,
      registered: new Date(),
      password: req.body.password,
      cpassword: req.body.cpassword,
      isAdmin: false,
    };
    users.push(newUser);
    fs.writeFileSync(path.resolve(__dirname, '../data/users.json'), JSON.stringify(users, null, 2));
    res.json({
      status: 200,
      data: newUser,
    });
  });
};
export default registerUser;
