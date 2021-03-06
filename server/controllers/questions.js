import Database from '../db/db-connection';

const getQuestions = async (req, res) => {
  const sql = `SELECT * FROM question_table WHERE meetup = '${req.params.id}' ORDER BY upvotes DESC, downvotes ASC`;
  const questions = Database.executeQuery(sql);
  questions.then((result) => {
    // return the result
    if (result.rows) {
      return res.status(200).json({
        status: 200,
        data: result.rows,
      });
    }

    return res.status(404).json({
      status: 404,
      error: 'No Questions are available for this meetup',
    });
  }).catch(error => res.status(500).json({ status: 500, error: `Internal server error ${error}` }));
};

export default getQuestions;
