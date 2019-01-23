import uuid from 'uuid';
import joi from 'joi';
import Database from '../db/db-connection';
import Validation from '../helpers/validation';
import jsonWebToken from 'jsonwebtoken';
import tokenVerifier from 'express-jwt';

const addMeetup = (req, res) => {
  joi.validate(req.body, Validation.meetupSchema, Validation.validationOption, (err, result) => {
    if (err) {
      return res.status(400).json({
        status: 400,
        error: err.details[0].message,
      });
    }
    const date = result.happeningOn.split('-');
    const newMeetup = [
      uuid.v4(),
      new Date(),
      result.location,
      result.topic,
      new Date(date[2],date[1],date[0]),
    ];
    const sql = `INSERT INTO meetup_table (id,created_on,location,topic,happening_on) VALUES ($1,$2,$3,$4,$5) RETURNING *`;
    const meetup = Database.executeQuery(sql,newMeetup);
    meetup.then((result) => {
      if(result.rows.length) {
        return res.status(200).json({
          status:200,
          data:result.rows,
        });
      }
      else{
        return res.status(400).json({
          status: 400,
          error: ' Failled To save data in the database'
        });
      }
        }).catch((error) => {
      res.status(500).json({
        status:500,
        error:`Internal server error - ${error}`,
      });
    });
    })
};
export default addMeetup;
