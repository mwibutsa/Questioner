import Database from '../db/db-connection';

const questions = async () => {
  const sql = 'SELECT * FROM question_table';
  const { rows } = await Database.executeQuery(sql);
  return [...rows];
};

export default questions;
