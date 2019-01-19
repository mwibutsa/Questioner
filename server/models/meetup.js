import Database from '../db/db-connection';

const meetups = async () => {
  const sql = 'SELECT * FROM meetup_table';
  const { rows } = await Database.executeQuery(sql);
  return [...rows];
};
export default meetups;
