import Database from '../database/db_connection';
import uuid from 'uuid';

const addQuestion = async (req, res) => {
  let { title,question } = req.body;
  let newQuestion = [uuid.v4(),new Date(),'f1244cd1-ef56-4c1f-8279-6bf4375a0c92',req.params.id,title,question,0];
  let saveQuestionQuery = `INSERT INTO question_table (id,created_on,created_by,meetup,title,body,votes) VALUES (
    $1,$2,$3,$4,$5,$6,$7
  ) RETURNING *`;
    console.log(newQuestion)
  const { rows } = await Database.executeQuery(saveQuestionQuery,newQuestion);


  res.json({status:200,data:rows});
};

export default addQuestion;