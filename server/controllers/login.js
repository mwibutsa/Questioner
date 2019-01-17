import joi from 'joi';
import users from '../models/user';
import Validation from '../helpers/validation';

const authenticateUser = (req, res) => {
  joi.validate(req.body, Validation.loginSchema, Validation.validationOption, (err, res) => {
    if (err) {
      return res.json({
        status: 500,
        error: err,
      });
    }
    const userAccount = {
      username: req.body.username,
      password: req.body.password,
    };
    const user = users.find(user => user.username === userAccount.username && user.password === userAccount.password);
    if (user) {
      res.json({
        status: 200,
        data: user,
      });
    } else {
      res.json({
        status: 404,
        error: 'Invalid username or password',
      });
    }
  });
};
export default authenticateUser;
