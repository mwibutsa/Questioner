import Database from '../db/db-connection';

const getQuestionById = async (req, res) => {
  const sql = `SELECT * FROM question_table WHERE id = '${req.params.id}'`;
  const question = Database.executeQuery(sql);
  question.then((result) => {
    if (result.rows.length) {
      return res.status(200).json({
        status: 200,
        data: result.rows,
      });
    }

    return res.status(404).json({
      status: 404,
      error: 'No meetup with the given id',
    });
  }).catch(error => res.status(500).json({
    status: 500,
    error: `Internal server error ${error}`,
  }));
};
export default getQuestionById;
