import jsonWebToken from 'jsonwebtoken';
import uuid from 'uuid';
import Database from '../db/db-connection';

export default function getToken(req) {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];
    const tokenData = jsonWebToken.verify(token, process.env.SECRETKEY);
    if (tokenData) {
      return tokenData;
    }

    return false;
  }

  return false;
}
export const searchFromDb = async (req, user) => {
  const getVoters = `SELECT * FROM voters_table WHERE question_id = '${req.params.id}'
  AND voted_by = '${user[0].id}'`;
  const result = await Database.executeQuery(getVoters);
  if (result.rows.length) {
    return { found: true, data: result.rows[0] };
  }
  return { found: false, data: null };
};

export const processVote = async (req, res, vote) => {
  // check if the user is in voters table
  try {
    const { user } = getToken(req);
    // eslint-disable-next-line no-empty
    const findUser = await searchFromDb(req, user);
    if (!(findUser.found)) { // user is new voter
      const newVoteSql = `UPDATE question_table SET ${vote}s = ${vote}s + 1
      WHERE id = '${req.params.id}' RETURNING *`;
      const registerVoterSql = `INSERT INTO voters_table (id,created_on,voted_by,question_id,vote 
        ) VALUES ($1,$2,$3,$4,$5) RETURNING *`;
      // TIME TO EXECUTE
      const newVoter = [uuid.v4(), new Date(), user[0].id, req.params.id, vote];
      Database.executeQuery(registerVoterSql, newVoter).catch(error => res.status(500)
        .json({ status: 500, error: `Server error ${error}` }));
      Database.executeQuery(newVoteSql).then((result) => {
        if (result.rows) {
          return res.status(201).json({ status: 201, data: result.rows });
        }
      }).catch(error => res.status(500).json({ status: 500, error: `SERVER ERROR ${error}` }));
    } else { // user is already a voter
      // 1. user is toggling the same vote
      const voter = await searchFromDb(req, user);
      if ((voter.vote).trim() === vote.trim()) {
        // update same vote and decrease by one
        const updateVoter = `DELETE FROM voters_table WHERE question_id = '${req.params.id}'
         AND voted_by = '${user.id}'`;
        const reduceVotes = `UPDATE question_table SET ${vote}s = ${vote}s -1 WHERE id = '${req.params.id}'`;
        Database.executeQuery(updateVoter).catch(error => res
          .status(500).json({ status: 500, error: `Server ERROR ${error}` }));
        Database.executeQuery(reduceVotes).then((result) => {
          if (result.rows.length) {
            return res.status(201).json({ status: 201, data: result.rows });
          }
        })
          .catch(error => res.status(500).json({ status: 500, error: `Server error : ${error}` }));
      } else { // 2. user is switching votes
        // 1. update voters_table
        const updateVoters = `UPDATE voters_table SET vote = '${vote}' WHERE question_id = '${req.params.id}'
         AND voted_by = '${user.id}'`;
        // 2. reduce previous vote
        const nextVote = (vote === 'upvote') ? 'downvote' : 'upvote';
        const reducePrev = `UPDATE question_table SET ${nextVote}s = ${nextVote} + 1, ${vote}s = ${vote}s -1
        WHERE id = '${req.params.id}'`;
        Database.executeQuery(updateVoters).catch(error => res.status(500).json({ status: 500, error: `Server error ${error}` }));
        Database.executeQuery(reducePrev).then((result) => {
          if (result.rows) {
            return res.status(201).json({ status: 201, data: result.rows });
          } return res.status(500).json({ status: 500, error: 'Failled to process vote' });
        })
          .catch(error => res.status(500).json({ status: 500, error: `Server error ${error}` }));
      }
    }
  } catch (error) {
    return res.status(500).json({ status: 500, error: `INTERNAL SERVER ERROR ${error}` });
  }
};
