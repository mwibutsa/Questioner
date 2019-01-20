import Database from '../db/db-connection';

const getMeetupById = async (req, res) => {
  const sql = `SELECT * FROM meetup_table WHERE id = '${req.params.id}'`;
  try {
    const { rows } = await Database.executeQuery(sql);
    if (rows) {
      return res.status(200).json({
        status: 200,
        data: rows,
      });
    }
  } catch (error) {
    return res.json({
      status: 404,
      error,
    });
  }
};
export default getMeetupById;
