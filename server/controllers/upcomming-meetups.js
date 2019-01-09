import meetups from '../models/meetup';

// get all meetups upcomming meetups
/**
 *
 * @param {mList} meetup list
 * @param {upC} res upcomming meetups
 */
const isUpcomming = meetup => (new Date(meetup.happening_on)).getTime() > (new Date()).getTime();
const getUpcommingMeetups = async (req, res) => {
  // get al meetups from the database
  const mList = await meetups();
  // filter meeups with happening date greater than todya
  const upC = mList.filter(meetup => isUpcomming(meetup));

  // if there are upcomming meetups

  if (upC) {
    return res.json({ status: 200, data: upC });
  } // if there is no upcomming meetup
  return res.json({
    status: 404,
    error: 'No upcomming meetups',
  });
};
export default getUpcommingMeetups;
