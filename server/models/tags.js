import Database from '../db/db-connection';

const tags = async () => {
  const sql = 'SELECT * FROM tags_table';
  const { rows } = await Database.executeQuery(sql);
  return [...rows];
};
export default tags;
