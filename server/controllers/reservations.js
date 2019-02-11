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

const attendMeetup = (req, res) => {
  let rsvpUser = '';
  if (getToken(req)) {
    const { user } = getToken(req);
    rsvpUser = user[0].id;
  }
  // check if the meetup is valid
  const checkMeetupSql = `SELECT * FROM meetup_table WHERE id  = '${req.params.id}'`;
  const isAvailable = Database.executeQuery(checkMeetupSql);
  isAvailable.then((isValid) => {
    if (isValid.rows) {
      if (isValid.rows.length) {
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
            reservation = Database.executeQuery(sql, newReservation);
          } else {
            sql = `UPDATE rsvp_table SET answer = '${result.answer}',
           created_on = NOW() WHERE user_id = '${rsvpUser}' AND
           meetup_id = '${req.params.id}' RETURNING *`;
            reservation = Database.executeQuery(sql);
          }
          reservation.then((rsvpResult) => {
            if (rsvpResult.rows) {
              return res.status(201).json({
                status: 201,
                data: rsvpResult.rows,
              });
            }
            return res.status(400).json({
              status: 400,
              error: `Failled to make reservation ${rsvpResult}`,
            });
          }).catch(error => res.status(500).json({
            status: 500,
            error: `Internal server error ${error}`,
          }));
        }).catch(error => res.status(400).json({ status: 400, error: [...error.details] }));
      }
    } else {
      res.status(400).json({ status: 400, error: 'Can not rsvp to a non existing meetup' });
    }
  }).catch(error => res.status(500).json({ status: 500, error: `Server error ${error}` }));
};

export default attendMeetup;
