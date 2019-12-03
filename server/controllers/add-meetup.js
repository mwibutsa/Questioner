import uuid from 'uuid';
import joi from 'joi';
import Database from '../db/db-connection';
import Validation from '../helpers/validation';

const addMeetup = (req, res) => {
  joi.validate(req.body, Validation.meetupSchema, Validation.validationOption).then((result) => {
    const date = result.happeningOn.split('-');
    const newMeetup = [
      uuid.v4(),
      new Date(),
      result.location,
      result.topic,
      new Date(date[0], date[1], date[2]),
    ];
    const sql = 'INSERT INTO meetup_table (id,created_on,location,topic,happening_on) VALUES ($1,$2,$3,$4,$5) RETURNING *';
    const meetup = Database.executeQuery(sql, newMeetup);
    meetup.then((insertedMeetup) => {
      if (insertedMeetup.rows) {
        if (insertedMeetup.rows.length) {
          return res.status(200).json({
            status: 200,
            data: insertedMeetup.rows,
          });
        }
      }

      return res.status(400).json({
        status: 400,
        error: ' Failled To save data in the database',
      });
    }).catch((error) => {
      res.status(500).json({
        status: 500,
        error: `Internal server error - ${error}`,
      });
    });
  }).catch(error => res.status(400).json({
    status: 400,
    error: error.details,
  }));
};
export default addMeetup;
