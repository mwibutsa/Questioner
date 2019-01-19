import Database from '../db/db-connection';

const voters = async () => {
  const sql = 'SELECT * FROM voters_table';
  const { rows } = await Database.executeQuery(sql);
  return [...rows];
};
export default voters;
