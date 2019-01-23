import uuid from 'uuid';
import joi from 'joi';
import Database from '../db/db-connection';
import Validation from '../helpers/validation';
import jsonWebToken from 'jsonwebtoken';

const addQuestion = (req, res) => {
  joi.validate(req.body, Validation.questionSchema, Validation.validationOption, async (err, result) => {
    if (err) {
      return res.json({
        status: 400,
        error: [...err.details],
      });
    }



    let token = 0;
    let decodedToken = '';
    let userId = '';
    if(req.headers['authorization']){
      token = req.headers['authorization'].split(' ')[1];
      decodedToken  = jsonWebToken.verify(token,process.env.SECRETKEY);
      userId = decodedToken.user[0].id;
    }
    else{
      return res.sendStatus(403);
    }
    const newQuestion = [
      uuid.v4(),
      new Date(),
      userId,
      req.params.id, // meetup id
      result.title,
      result.body,
      0,
      0,
    ];
    const sql = 'INSERT INTO question_table (id,created_on,created_by,meetup,title,body,upvotes,downvotes) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *';

      const question = Database.executeQuery(sql, newQuestion);
      question.then((result) => {
        if(result.rows.length){
          return res.status(201).json({
            status: 201,
            data: result.rows,
          });
        }
        else{
          return res.status(400).json({
            status: 400,
            error: 'Question could not be created',
          });
        }
      }).catch((error) => {
        return res.status(500).json({
          status: 500,
          error: `Internal server error ${error}`
        });
      });   
  });
};

export default addQuestion;
