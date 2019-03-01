import Database from '../db/db-connection';

const getUserById = (req, res) => {
const sql = `SELECT * FROM user_table WHERE id = '${eq.params.id}'`;
Database.executeQuery(sql)
.then((user) => {
  if (user.rows) {
    return res.status(200).json({ status: 200, data: user.rows });
  } else {
    return res.status(500).json({ status: 500, error: `Server error : ${error}`});
  }

}).catch(error => res.status(200).json({ status: 500, error: `Server error :  ${error}` }));

};