import Database from '../database/db_connection';

const reservations =  async () =>{
    const reservationQuery =  `SELECT * FROM reservation_table ORDER BY created_on DESC`;
    const { rows } = await Database.executeQuery(reservationQuery);
    return [...rows];

}
export default reservations;