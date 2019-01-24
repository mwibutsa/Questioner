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
  // check if the user is loged in in order to vote
  try {
    const { user } = getToken(req);
    if (user) {
      // now that user is logged in  check if they have not voted the same question
      const checkUserSql = `SELECT * FROM voters_table WHERE voted_by  = '${user[0].id}'
       AND quesion_id = '${req.params.id}'`;
      Database.executeQuery(checkUserSql).then(async (result) => {

        // check if the user is found
        if (result.rows.length) {
          const { rows: voter } = result;
          // the user have either upvoted or downvoted the same question
          if ((voter[0].vote).trim() === voteMethod.trim()) { // user is trying the same vote          
            // reduce the vote
            const updateQuestionVoteSql = `UPDATE question_table SET ${voteMethod}s
             = ${voteMethod}s -1 WHERE id = '${req.params.id}' RETURNING *`;
            Database.executeQuery(updateQuestionVoteSql).then((voted) => {
              if(voted.rows.length) { // on successful update
                return res.status(201).json({
                  status: 201,
                  data: voted.rows,
                });
              }
            })
              .catch(error => res.status(500).json({ status: 500, error: `Server error: ${error}` }));
            // remove voter from voters table
            const deleteUserQuery = `DELETE FROM voters_table WHERE voted_by = '${(voter[0].voted_by)}'
            AND quesion_id = '${req.params.id}'`;
           Database.executeQuery(deleteUserQuery).then(deleted => console.log(deleted))
             .catch(deleteError => console.log(deleteError));
          }
          else{
            // switch votes
            voteMethod = (voteMethod === 'upvote')?'downvote':'upvote';
            const updateVoter = `UPDATE voters_table SET vote = '${voteMethod}' WHERE
             voted_by = '${voter[0].voted_by}' AND quesion_id ='${req.params.id}'`;
             Database.executeQuery(updateVoter).then((switchResult) => console.log('Update voter',switchResult))
             .catch(error => console.log(error));
             // decrease reduced vote
             const decreaseSql = `UPDATE question_table SET ${vote}s = ${vote}s - 1
              WHERE id = '${req.params.id}' RETURNING *`;
              Database.executeQuery(decreaseSql).then(update => console.log('update question',update))
              .catch(error => console.log(error));

             // increase lastvote
             const increaseVoteSql = `UPDATE question_table SET ${voteMethod}s = ${voteMethod}s + 1
             WHERE id = '${req.params.id}' RETURNING *`
             Database.executeQuery(increaseVoteSql).then((updatedQuestion) => {
               if(updatedQuestion.rows.length) {
                 return res.status(201).json({status: 201, data: updatedQuestion.rows});
               }
             })
             .catch(error => console.log(error));
          }
        } else { // when user was not in the database save the user
          voteMethod = vote;
          const newVoter = [
            uuid.v4(),
            new Date(),
            user[0].id,
            req.params.id,
            voteMethod
          ];

          const saveVoteSql = `INSERT INTO voters_table (id,created_on,voted_by,quesion_id,vote) VALUES ($1,$2,$3,$4,$5) RETURNING *`;
          Database.executeQuery(saveVoteSql,newVoter).then((savedVoter) => {
            // if(savedVoter.rows.length) {
              console.log('New voter',savedVoter);
            // }

          }).catch(error => res.status(500).json({status: 500, error: `Server Error ${error}`}));
          // increase the votes
          const increaseVoteSql = `UPDATE question_table SET ${voteMethod}s = ${voteMethod}s + 1 WHERE id = '${req.params.id}'
           RETURNING *`;
           Database.executeQuery(increaseVoteSql).then((votedQuestion) => {
             if(votedQuestion.rows.length) { 
               return res.status(201).json({status: 201, data: votedQuestion.rows});

              } 
           });
        }
      }).catch(error => res.status(500).json({ status: 500, error: `Server error: ${error}` }));
    }
  } catch (error) {
    // if there was an error finding a user
  }
};
