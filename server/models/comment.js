import Database from '../db/db-connection';

const comments = async () => {
  const sql = 'SELECT * FROM comment_table';
  const { rows } = await Database.executeQuery(sql);
  return [...rows];
};
export default comments;
