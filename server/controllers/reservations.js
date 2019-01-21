import uuid from 'uuid';
import joi from 'joi';
import Validation from '../helpers/validation';
import Database from '../db/db-connection';

let rsvpUser = '99b6d019-ac6e-4c4b-afb5-6cd7d1fb3138';

const attendMeetup = async (req, res) => {
  if (req.session) {
    const { userId } = req.session;
    rsvpUser = userId;
  }
  joi.validate(req.body, Validation.rsvpSchema,
    Validation.validationOption, async (err, result) => {
      const newReservation = [
        uuid.v4(),
        new Date(),
        rsvpUser,
        req.params.id,
        result.answer,
      ];
      const sql = `INSERT INTO rsvp_table ( id,created_on,user_id,meetup_id,answer)
      VALUES ($1,$2,$3,$4,$5) RETURNING *`;
      try {
        const { rows } = await Database.executeQuery(sql, newReservation);
        if (rows) {
          return res.status(200).json({
            status: 200,
            data: rows,
          });
        }
      } catch (error) {
        return res.status(500).json({
          status: 500,
          error,
        });
      }
      return res.status(404).json({
        status: 400,
        error: 'Data can not be saved',
      });
    });
};

export default attendMeetup;
