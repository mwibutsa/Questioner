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

      const reservation = Database.executeQuery(sql, newReservation);
      reservation.then((result) => {
        if (result.rows.length) {
          return res.status(201).json({
            status: 201,
            data: result.rows,
          });
        }

        return res.status(400).json({
          status: 400,
          error: 'Failled to make reservation',
        });
      }).catch(error => res.status(500).json({
        status: 500,
        error: `Internal server error ${error}`,
      }));
    });
};

export default attendMeetup;
