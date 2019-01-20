import Database from '../db/db-connection';
import Helper from '../helpers/helpers';

const getQuestions = async (req, res) => {
  const sql = `SELECT * FROM question_table WHERE meetup = '${req.params.id}'`;
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
  return res.status(404).json({
    status: 404,
    error: 'No Questions are availbale for this meetup',
  });
};

export default getQuestions;
