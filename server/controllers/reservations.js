import uuid from 'uuid';
import joi from 'joi';
import Validation from '../helpers/validation';
import Database from '../db/db-connection';
import getToken from '../helpers/functions';

const sameRsvp = async (userId, req) => {
  const sql = `SELECT * FROM rsvp_table WHERE user_id = '${userId}' AND meetup_id = '${req.params.id}'`;
  const { rows } = await Database.executeQuery(sql);
  if (rows.length) return true;
  return false;
};

const attendMeetup = async (req, res) => {
  let rsvpUser = '';
  if (getToken(req)) {
    const { user } = getToken(req);
    rsvpUser = user[0].id;
  }
  try {
    // check if the meetup is valid
    const checkMeetupSql = `SELECT * FROM meetup_table WHERE id  = '${req.params.id}'`;
    const isAvailable = await Database.executeQuery(checkMeetupSql);
    if (isAvailable.rows) {
      if (isAvailable.rows.length) {
        joi.validate(req.body, Validation.rsvpSchema,
          Validation.validationOption).then(async (result) => {
          const newReservation = [
            uuid.v4(),
            new Date(),
            rsvpUser,
            req.params.id,
            result.answer,
          ];
          let sql = '';
          let reservation = '';
          const sameRsvpValue = await sameRsvp(rsvpUser, req);
          if (!sameRsvpValue) {
            sql = `INSERT INTO rsvp_table (id,created_on,user_id,meetup_id,answer)
            VALUES ($1,$2,$3,$4,$5) RETURNING *`;
            reservation = await Database.executeQuery(sql, newReservation);
          } else {
            sql = `UPDATE rsvp_table SET answer = '${result.answer}',
       created_on = NOW() WHERE user_id = '${rsvpUser}' AND
       meetup_id = '${req.params.id}' RETURNING *`;
            reservation = await Database.executeQuery(sql);
          }
          if (reservation.rows) {
            return res.status(201).json({
              status: 201,
              data: reservation.rows,
            });
          }
          return res.status(400).json({
            status: 400,
            error: 'Failled to make reservation',
          });
        }).catch(error => res.status(400).json({ status: 400, error: [...error.details] }));
      }
    } else {
      res.status(400).json({ status: 400, error: 'Can not rsvp to a non existing meetup' });
    }
  } catch (error) {
    return res.status(500).json({ status: 500, error: `Internal server error$, ${error}` });
  }
};

export default attendMeetup;
