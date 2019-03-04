import Database from '../db/db-connection';
import jsonwebtoken from 'jsonwebtoken';

const getTopQuestions = async (req, res) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jsonwebtoken.verify(token, process.env.SECRETKEY);
    const userId = decodedToken.user[0].id;
    // GET RSVPED MEETUPS
    const sql = `SELECT * FROM question_table WHERE meetup IN (SELECT meetup_table.id FROM meetup_table INNER JOIN rsvp_table ON meetup_table.id = rsvp_table.meetup_id AND rsvp_table.user_id = '${userId}' AND meetup_table.happening_on > NOW())
    ORDER BY question_table.upvotes DESC LIMIT 10;`
    Database.executeQuery(sql)
    .then((result) => {
      if (result.rows) {
        return res.status(200).json({status: 200, data: result.rows});
      } else {
        return res.status(500).json({ status: 500, error: `Server error: ${error}`});
      }
    }).catch(error => res.status(500).json({ status: 500, error: `Internal server error: ${error}`}));

  }
}
export default getTopQuestions;
