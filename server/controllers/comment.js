import joi from 'joi';
import uuid from 'uuid';
import Database from '../db/db-connection';
import Validator from '../helpers/validation';
import getToken from '../helpers/functions';

const getComment = (req, res) => {
  const sql = `SELECT * FROM comment_table  WHERE question = '${req.params.id}'`;
  const comments = Database.executeQuery(sql);
  comments.then((result) => {
    if (result.rows.length) {
      return res.status(200).json({
        status: 200,
        data: result.rows,
      });
    }

    return res.status(404).json({
      status: 404,
      error: 'No comments are available for this question',
    });
  }).catch(error => res.status(500).json({
    status: 500,
    error: `Internal server error: ${error}`,
  }));
};

const postComment = (req, res) => {
  const sql = `INSERT INTO comment_table 
  (id,created_on,created_by,question,body) VALUES ($1,$2,$3,$4,$5) RETURNING *`;
  const checkQuestion = `SELECT * FROM question_table WHERE id  = '${req.params.id}'`;
  // check if the question exist
  const question = Database.executeQuery(checkQuestion);
  question.then((result) => {
    if (result.rows.length) {
    // validate comment
      joi.validate(req.body, Validator.commentSchema, Validator.validationOption)
        .then((postData) => {
          const newComment = [
            uuid.v4(), new Date(), getToken(req).user[0].id, req.params.id, postData.comment,
          ];
          console.log(newComment);
          // get comments from the database

          const comment = Database.executeQuery(sql, newComment);
          comment.then((savedComment) => {
            console.log(savedComment);
            if (savedComment.rows.length) {
              return res.status(201).json({
                status: 201,
                data: savedComment.rows,
              });
            }

            return res.status(500).json({
              status: 500,
              error: 'Internal server error',
            });
          }).catch(error => res.status(500).json({
            status: 500,
            error: `internal server error: ${error.message}`,
          }));
        }).catch(error => res.status(400).json({
          status: 400,
          error: `Input validation Error ${error}`,
        }));
    } else {
      return res.status(400).json({
        status: 400,
        error: 'You are trying to comment on a question which does not exist',
      });
    }
  }).catch(error => res.status(500).json({
    status: 500,
    error: `Internal server error ${error.message}`,
  }));
};

export { getComment, postComment };
