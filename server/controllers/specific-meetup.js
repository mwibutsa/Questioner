import fs from 'fs';
import meetups from '../models/meetup';
const getMeetupById = (req, res) => {
  const meetupById = meetups.find(meetup => parseInt(meetup.id) === parseInt(req.params.id));
  if (meetupById) {
    res.json(meetupById);
  } else {
    res.json({
      status: 404,
      error: 'The meetup with given id is not found',
    });
  }
};
export default getMeetupById;