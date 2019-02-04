import Database from '../db/db-connection';

const getUpcomingMeetups = async (req, res) => {
  const sql = 'SELECT * FROM meetup_table WHERE happening_on > NOW()';
  const upcommingMeetups = Database.executeQuery(sql);
  upcommingMeetups.then((result) => {
    if (result.rows) {
      return res.status(200).json({
        status: 200,
        data: result.rows,
      });
    }

    return res.status(404).json({
      status: 404,
      error: 'No upcoming meetups are available',
    });
  }).catch((error) => {
    res.status(500).json({
      status: 500,
      error: `Internal server error ${error}`,
    });
  });
};
export default getUpcomingMeetups;
