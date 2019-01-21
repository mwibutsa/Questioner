import Database from '../db/db-connection';

const reservations = async () => {
  const sql = 'SELECT * FROM resvp_table';
  const { rows } = await Database.executeQuery(sql);
  return [...rows];
};

export default reservations;
