import uuid from 'uuid';
import fs from 'fs';
import path from 'path';
import users from '../models/user';

const registerUser = (req, res) => {
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
};
export default registerUser;
