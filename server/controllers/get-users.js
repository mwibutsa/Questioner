import { selectFrom } from '../models/getAll';

const getUsers = async (req, res) => {
  selectFrom('user_table').then((users) => {
    if (users.rows) {
      return res.status(200).json({ status: 200, data: users.rows });
    }
  }).catch(error => res.status(500).json({ status: 500, error: `Internal server error : ${error}` }));
};

export default getUsers;
