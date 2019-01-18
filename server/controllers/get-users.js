import users from '../models/user';

const getUsers = (req, res) => {
  if (users) {
    return res.json({
      status: 200,
      data: users,
    });
  }

  return res.json({
    status: 404,
    error: 'No users are available',
  });
};

export default getUsers;
