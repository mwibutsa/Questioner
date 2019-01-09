import Database from '../database/db_connection';

const users =  async () =>{
    const getUsersQuery =  `SELECT * FROM user_table`;
    const { rows } = await Database.executeQuery(getUsersQuery);
    return [...rows];

}
export default users;