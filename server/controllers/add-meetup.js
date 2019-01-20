import uuid from 'uuid';
import joi from 'joi';
import Database from '../db/db-connection';
import Validation from '../helpers/validation';


const addMeetup = (req, res) => {
  joi.validate(req.body, Validation.meetupSchema, Validation.validationOption, async (err, result) => {
    if (err) {
      return res.json({
        status: 400,
        error: err.details[0].message,
      });
    }
    const newMeetup = [
      uuid.v4(),
      new Date(),
      result.location,
      result.topic,
      result.happeningOn,
    ];
    const sql = 'INSERT INTO meetup_table(id, created_on,location,topic,happening_on) VALUES ($1,$2,$3,$4,$5) RETURNING *';
    try {
      const { rows } = await Database.executeQuery(sql, newMeetup);
      if (rows) {
        res.status(201).json({
          status: 201,
          data: rows,
        });
      }
    } catch (error) {
      res.status(500).json({
        status: 500,
        error,
      });
    }
  });
};
export default addMeetup;
