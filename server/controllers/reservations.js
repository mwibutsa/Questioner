import fs from 'fs';
import reservations from '../models/reservation';
import path from 'path';
import uuid from 'uuid';

const attendMeetup = (req, res) => {
  const newReservation = {
	  id: uuid.v4(),
	  meetup_id: req.params.id,
	  user_id: req.session.user_id,
	  answer: req.body.answer,
  };
  reservations.push(newReservation);
  fs.writeFileSync(path.resolve(__dirname,'../data/reservation.json'),JSON.stringify(reservations,null,2));
  return res.json({status:200,data:reservations});
};

export default attendMeetup;