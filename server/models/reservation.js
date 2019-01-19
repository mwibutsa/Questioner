import Database from '../db/db-connection';

const reservations = async () => {
  const sql = 'SELECT * FROM reservation_table';
  const { rows } = Database.executeQuery(sql);
  return [...rows];
};

export default reservations;
