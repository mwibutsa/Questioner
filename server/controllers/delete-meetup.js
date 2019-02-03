import Database from '../db/db-connection';

const deleteMeetup = async (req, res) => {
  const sql = `DELETE FROM meetup_table WHERE id = '${req.params.id}' RETURNING *`;
  Database.executeQuery(sql).then((result) => {
    res.status(202).json({ status: 202, message: `meetup was deleted ${result.rows}` });
  }).catch(error => res.status(500).json({ status: 500, error: `Server error ${error}` }));
};

export default deleteMeetup;
