import uuid from 'uuid';
import joi from 'joi';
import jsonWebToken from 'jsonwebtoken';
import Database from '../db/db-connection';
import Validation from '../helpers/validation';

const addQuestion = (req, res) => {
  const checkMeetupSql = `SELECT * FROM meetup_table WHERE id  = '${req.params.id}'`;
  const isAvailable = Database.executeQuery(checkMeetupSql);
  isAvailable.then((isValid) => {
    if (isValid.rows.length) {
      joi.validate(req.body, Validation.questionSchema, Validation.validationOption)
        .then((result) => {
          let token = 0;
          let decodedToken = '';
          let userId = '';
          if (req.headers.authorization) {
          // eslint-disable-next-line prefer-destructuring
            token = req.headers.authorization.split(' ')[1];
            decodedToken = jsonWebToken.verify(token, process.env.SECRETKEY);
            userId = decodedToken.user[0].id;
          } else {
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
          const sql = `INSERT INTO question_table (id,created_on,created_by,meetup,title,body,upvotes,downvotes)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`;
          const question = Database.executeQuery(sql, newQuestion);
          question.then((questionResult) => {
            if (questionResult.rows.length) {
              return res.status(201).json({
                status: 201,
                data: questionResult.rows,
              });
            }

            return res.status(400).json({
              status: 400,
              error: 'Question could not be created',
            });
          }).catch(error => res.status(500).json({
            status: 500,
            error: `Internal server error ${error}`,
          }));
        }).catch(error => res.status(400).json({ status: 400, error: [...error.details] }));
    } else {
      return res.status(400)
        .json({ status: 400, error: 'Error : can not ask question to a non existing meetup' });
    }
  }).catch(error => res.status(500).json({ status: 500, error: `Server error: ${error}` }));
};

export default addQuestion;
