import reservations from '../models/reservation';
import Database from '../database/db_connection';

import uuid from 'uuid';

const attendMeetup = async (req, res) => {
  console.log(req.session);
  const newReservation = [
	  uuid.v4(),
    req.params.id,
    new Date(),
	  req.session.user_id,
	  req.body.answer
];
 const reserveQuery = `INSERT INTO reservation_table (id,meetup_id,created_on,user_id,answer) VALUES ($1,$2,$3,$4,$5) RETURNING *`;
  const { rows } = await Database.executeQuery(reserveQuery,newReservation);
  const reservation = await reservations();
  res.json({
    status:200,
    data:reservation
  })
};

export default attendMeetup;