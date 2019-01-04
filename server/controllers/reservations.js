import fs from 'fs';
import reservations from '../reservations';
const attendMeetup = (req, res) => {
  const newReservation = {
	  id: reservations.length + 1,
	  meetup_id: req.params.id,
	  user_id: 1,
	  answer: req.body.answer,
  };
  reservations.push(newReservation);
  fs.writeFileSync('./data/reservation.json',JSON.stringify(reservations,null,2));
  return res.json(reservations);
};

export default attendMeetup;