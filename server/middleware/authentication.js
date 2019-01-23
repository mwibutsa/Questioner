import jsonWebToken from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  const token = req.headers.Authorization;

  const loggedIn = jsonWebToken.verify(token, process.env.SECRETEKEY);
  if (loggedIn) {
    next();
  } else {
    return res.redirect('/api/v1/users/login');
  }
};

export default verifyToken;
