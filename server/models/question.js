import Database from '../database/db_connection';

const questions =  async () =>{
    const getQuestionQuery =  `SELECT * FROM question_table ORDER BY created_on DESC`;
    const { rows } = await Database.executeQuery(getQuestionQuery);
    return [...rows];

}
export default questions;