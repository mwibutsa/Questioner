import uuid from 'uuid';
import joi from 'joi';
import Database from '../db/db-connection';
import Validation from '../helpers/validation';

const addQuestion = (req, res) => {
  joi.validate(req.body, Validation.questionSchema, Validation.validationOption, async (err, result) => {
    if (err) {
      return res.json({
        status: 400,
        error: [...err.details],
      });
    }

    // const { userId } = req.session;
    const userId = '99b6d019-ac6e-4c4b-afb5-6cd7d1fb3138';
    console.log(userId);
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
      if (result.rows.length) {
        return res.status(201).json({
          status: 201,
          data: result.rows,
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
  });
};

export default addQuestion;
