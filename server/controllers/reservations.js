import uuid from 'uuid';
import joi from 'joi';
import Validation from '../helpers/validation';
import Database from '../db/db-connection';
import getToken from '../helpers/functions';


const attendMeetup = async (req, res) => {
  let rsvpUser = '';
  if (getToken(req)) {
    const { user } = getToken(req);
    rsvpUser = user[0].id;
  }
  joi.validate(req.body, Validation.rsvpSchema,
    Validation.validationOption).then((result) => {
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
    reservation.then((rsvpResult) => {
      if (rsvpResult.rows.length) {
        return res.status(201).json({
          status: 201,
          data: rsvpResult.rows,
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
  }).catch(error => res.status(400).json({ status: 400, error: [...error.details] }));
};

export default attendMeetup;
