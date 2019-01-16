import meetups from '../models/meetup';

const checkUpcomming = (meetup) => {
  const d = meetup.happeningOn.split('-');
  const date = new Date(parseInt(d[2], 10), parseInt(d[1], 10), parseInt(d[0], 10));
  if (date.getTime() > (new Date()).getTime()) {
    return true;
  }
  return false;
};
const getUpcommingMeetups = (req, res) => {
  const upComming = meetups.filter(meetup => checkUpcomming(meetup));

  if (upComming) {
    return res.json({ status: 200, data: upComming });
  }
  return res.json({
    status: 404,
    error: 'No upcomming meetups',
  });
};
export default getUpcommingMeetups;
