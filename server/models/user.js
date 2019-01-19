import Database from '../db/db-connection';

const users = async () => {
  const sql = 'SELECT * FROM user_table';
  const { rows } = await Database.executeQuery(sql);
  return [...rows];
};
export default users;
