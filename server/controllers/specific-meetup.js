import Database from '../db/db-connection';

const getMeetupById = (req, res) => {
  const sql = `SELECT * FROM meetup_table WHERE id = '${req.params.id}'`;
  const meetup = Database.executeQuery(sql);
  meetup.then((result) => {
    if (result.rows.length) {
      return res.status(200).json({
        status: 200,
        data: result.rows,
      });
    }

    return res.status(404).json({
      status: 404,
      error: 'There is no meetup with that id',
    });
  }).catch(error => res.status(500).json({
    status: 500,
    error: `Internal server error ${error}`,
  }));
};
export default getMeetupById;
