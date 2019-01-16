import meetups from '../models/meetup';

const compare = (value1, value2) => parseInt(value1, 10) === parseInt(value2, 10);
const getMeetupById = (req, res) => {
  const meetupById = meetups.find(meetup => compare(meetup.id.req.params.id));
  if (meetupById) {
    return res.json({
      status: 200,
      data: meetupById,
    });
  }
  return res.json({
    status: 404,
    error: 'The meetup with given id is not found',
  });
};
export default getMeetupById;
