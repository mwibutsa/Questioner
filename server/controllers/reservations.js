import fs from 'fs';
import path from 'path';
import joi from 'joi';
import reservations from '../models/reservation';
import Validation from '../helpers/validation';

const attendMeetup = (req, res) => {
  joi.validate(req.body, Validation.rsvpSchema, Validation.validationOption, (err, result) => {

    const newReservation = {
      id: reservations.length + 1,
      meetup_id: req.params.id,
      user_id: 1,
      answer: result.answer,
    };
    reservations.push(newReservation);
    fs.writeFileSync(path.resolve(__dirname, '../data/reservation.json'), JSON.stringify(reservations, null, 2));
    return res.json({ status: 200, data: reservations });
  });
};

export default attendMeetup;
