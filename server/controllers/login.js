import users from '../models/user';

const authenticateUser = (req, res) => {
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
};
export default authenticateUser;
