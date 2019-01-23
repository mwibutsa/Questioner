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

export const processVote = (req, res, vote) => {
  let voteMethod = vote;
  const { user } = getToken(req);
  const voteSql = `UPDATE question_table set ${voteMethod}s = ${voteMethod}s + $1 WHERE id = '${req.params.id}' RETURNING *`;
  const recordUserSql = `INSERT INTO voters_table (id,created_on,voted_by,quesion_id,vote)
    VALUES ($1,$2,$3,$4,$5) RETURNING *`;
  const updateVoterSql = `UPDATE voters_table SET vote = '${voteMethod}' WHERE created_by = '${user[0].id}'
  && question = '${req.params.id}' RETURNING *`;
  const deleteUserFromVoters = `DELETE FROM voters_table WHERE created_by = '${user[0].id}' && question_id = '${req.params.id}'`;

  const newVoter = [
    uuid.v4(),
    new Date(),
    user[0].id,
    req.params.id, // question a user have voted
    voteMethod,
  ];
  // CHECK IF THE USER HAVE VOTED THE SAME QUESTION BEFORE
  const checkSql = `SELECT * FROM voters_table WHERE voted_by = '${user[0].id}' `;
  Database.executeQuery(checkSql).then(async (result) => {
    if (result.rows.length) {
      if (result.rows.vote === voteMethod) {
        // delete the user from voters and reduce the voteMethod
        await Database.executeQuery(deleteUserFromVoters);

        // reduce vote
        Database.executeQuery(voteSql, [-1]).then((updatedQuestion) => {
            console.log('Update Quesition', updatedQuestion.rows);
          if (updatedQuestion.rows.length) {
            return res.status(201).json({
              status: 201,
              data: updatedQuestion.rows,
            });
          }
        });
      } else { // if user is not re-upvoting or re-downvoting ie(voted but want to change) shift the vote
        voteMethod = (voteMethod === 'upvote') ? 'downvote' : 'upvote';
        await Database.executeQuery(voteSql, [-1]); // reduce the vote
        await Database.executeQuery(updateVoterSql); // shit voter

        // update vote
        Database.executeQuery(voteSql, [1]).then((votedQuestion) => {
          if (votedQuestion.rows) {
            return res.status(201).json({
              status: 201,
              dat: votedQuestion.rows,
            });
          }
        });
      }
    } else { // if the user was not found in the voters
      // record the voter
      await Database.executeQuery(recordUserSql, newVoter);
      // vote and return the question

      const voted = (voteMethod === 'upvote') ? Database.executeQuery(voteSql, [1]) : Database.executeQuery(voteSql, [-1]);
      voted.then((voteResult) => {
          console.log(voteResult);
        if (voteResult.rows.length) {
          return res.status(201).json({
            status: 201,
            data: voteResult.rows,
          });
        }

        console.log(voteResult);
      }).catch(error => console.log(error));
    }
  }).catch((error) => {
    console.log(error);
  });
};
