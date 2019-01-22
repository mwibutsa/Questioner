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
    const meetup = Database.executeQuery(sql);
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
        });
    }).catch((error) => {
      res.json.status(500).json({
        status:500,
        error:'Internal server error',
      });
    });
};
export default addMeetup;
