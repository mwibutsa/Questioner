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
    const dayMonthYear = result.happeningOn.split('-');
    const date = new Date(dayMonthYear[2], dayMonthYear[1], dayMonthYear[0]);
    const newMeetup = [
      uuid.v4(),
      new Date(),
      result.location,
      result.topic,
      date,
    ];
    const sql = 'INSERT INTO meetup_table (id, created_on,location,topic,happening_on) VALUES ($1,$2,$3,$4,$5) RETURNING *';
    const meetup = Database.executeQuery(sql, newMeetup);
    meetup.then((insertedMeetup) => {
      if (result.insertedMeetup.length) {
        return res.status(200).json({
          status: 200,
          data: insertedMeetup.rows,
        });
      }

      return res.status(400).json({
        status: 400,
        error: ' Failled To save data in the database',
      });
    });
  }).catch((error) => {
    res.json.status(500).json({
      status: 500,
      error: `Internal server error ${error}`,
    });
  });
};
export default addMeetup;
