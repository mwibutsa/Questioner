import meetups from '../models/meetup';

const checkUpcoming = (meetup) => {
  const d = meetup.happeningOn.split('-');
  const date = new Date(parseInt(d[2], 10), parseInt(d[1], 10), parseInt(d[0], 10));
  if (date.getTime() > (new Date()).getTime()) {
    return true;
  }
  return false;
};
const getUpcomingMeetups = (req, res) => {
  const upComing = meetups.filter(meetup => checkUpcoming(meetup));

  if (upComing) {
    return res.json({ status: 200, data: upComing });
  }
  return res.json({
    status: 404,
    error: 'No upcoming meetups',
  });
};
export default getUpcomingMeetups;
