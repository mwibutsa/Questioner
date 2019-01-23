import jsonWebToken from 'jsonwebtoken';
import uuid from 'uuid';
import Database from '../db/db-connection';

const getToken = (req) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];
    const tokenData = jsonWebToken.verify(token, process.env.SECRETKEY);
    if (tokenData) {
      return tokenData;
    }

    return false;
  }

  return false;
};

const processVote = (req, res, vote) => {
  let voteMethod = vote;
  const { user } = getToken(req);
  const voteSql = `UPTADE question_table set ${voteMethod}s = ${voteMethod}s + $1 WHERE id = '${req.params.id}' RETURNING *`;
  const recordUserSql = `INSERT INTO voters_table (id,created_on,voted_by,quesion_id,vote)
    VALUES ($1,$2,$3,$4,$5) RETURNING *`;
  const updateVoterSql = `UPDATE voters_table SET vote = '${voteMethod}' WHERE created_by = '${user[0].id}'
  && question = '${req.params.id}' RETURNING *`;
  const deleteUserFromVoters = `DELETE FROM voters_table WHERE created_by = '${user[0].id}'`;

  const newVoter = [
    uuid.v4(),
    new Date(),
    user[0].id,
    req.params.id, // question a user have voted
    voteMethod,
  ];
  // CHECK IF THE USER HAVE VOTED THE SAME QUESTION BEFORE
  const checkSql = `SELECT * FROM voters_table WHERE create_by = '${user[0].id}' && question =
   '${req.params.id}'`;
  Database.executeQuery(checkSql).then(async (result) => {
    if (result.rows.length) {
      if (result.rows.vote === voteMethod) {
        // delete the user from voters and reduce the voteMethod
        await Database.executeQuery(deleteUserFromVoters);

        // reduce vote
        Database.executeQuery(voteSql, [-1]).then((updatedQuestion) => {
          if (updatedQuestion.rows.length) {
            return res.status(201).json({
              status: 201,
              data: updatedQuestion.rows,
            });
          }
        });
      } else { // if user is not re-upvoting or re-downvoting ie(voted but want to change) shift the vote
        voteMethod = (voteMethod === 'upvote') ? 'downvote' : 'upvote';
        Database.executeQuery(updateVoterSql).then((updateVoter) => { // update voters table
          console.log(result);
        }).catch((error) => {
          console.log(error);
        });
        // update vote
        Database.executeQuery(updatedQuestion);
      }
    }
  }).catch((error) => {
    console.log(error);
  });
};
export default getToken;
