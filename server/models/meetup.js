import Database from '../database/db_connection';

const meetups =  async () =>{
    const getmeetupQuery =  `SELECT * FROM meetup_table ORDER BY happening_on DESC`;
    const { rows } = await Database.executeQuery(getmeetupQuery);
    return [...rows];

}
export default meetups;