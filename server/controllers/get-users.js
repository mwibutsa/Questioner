import users from '../models/user';

const getUsers = async (req, res) => {
  if (users) {
    return res.json({
      status: 200,
      data: await users(),
    });
  }

  return res.json({
    status: 404,
    error: 'No users are available',
  });
};

export default getUsers;
