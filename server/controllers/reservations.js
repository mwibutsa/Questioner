import reservations from '../models/reservation';
import Database from '../database/db_connection';

import uuid from 'uuid';

const attendMeetup = async (req, res) => {
  const newReservation = [
	  uuid.v4(),
	  req.params.id,
	  req.session.user_id,
	  req.body.answer
];
 const reserveQuery = `INSERT INTO reservatiion_table (id,meetup_id,create_on,user_id,answer) VALUES ($1,$2,$3,$4,$5) RETURNING *`;
  const { rows } = await Database.executeQuery(reserveQuery,newReservation);
  console.log(rows);
  const reservation = await reservations();
  res.json({
    status:200,
    data:reservation
  })
};

export default attendMeetup;