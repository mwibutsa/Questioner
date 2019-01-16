import meetups from '../models/meetup';

const getMeetups = (req, res) => res.json({
  status: 200,
  data: meetups,
});

export default getMeetups;
