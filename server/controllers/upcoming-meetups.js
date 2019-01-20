import Database from '../db/db-connection';

const getUpcomingMeetups = async (req, res) => {
  const sql = 'SELECT * FROM meetup_table WHERE happening_on > NOW()';
  try {
    const { rows } = await Database.executeQuery(sql);
    if (rows) {
      return res.status(200).json({
        status: 200,
        data: rows,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error,
    });
  }
  res.status(404).json({
    status: 404,
    error: 'No Upcomming Meetups',
  });
};
export default getUpcomingMeetups;
