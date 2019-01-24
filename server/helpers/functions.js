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
  try {
    const { user } = getToken(req);
    const checkSql = `SELECT * FROM voters_table WHERE voted_by = 
    '${user[0].id}' AND question_id = '${req.params.id}'`;
    switch (vote) {
      case 'upvote':
        // // check if the user have upvoted the same question and remove the vote or add it
        // Database.executeQuery(checkSql).then((voterResult) => {
        //   if (!voterResult.rows.length) {
        //     console.log('user is not among voters');
        //     const newVoter = [
        //       uuid.v4(),
        //       new Date(),
        //       user[0].id,
        //       req.params.id,
        //       'upvote',
        //     ];
        //     const recorduserSql = `
        //     INSERT INTO voters_table (id,created_on,voted_by,question_id,vote) VALUES ($1,$2,$3,$4,$5) RETURNING *`;
        //     Database.executeQuery(recorduserSql, newVoter).then((userResult) => {
        //       // console.log(userResult);
        //     }).then(error => res.status(500).json({ status: 500, error: `Server error ${error}` }));

        //     const voteSql = `UPDATE question_table SET upvotes = upvotes + 1 WHERE id ='${req.params.id}'
        //      RETURNING *`;
        //     Database.executeQuery(voteSql).then((votedQuestion) => {
        //       if (votedQuestion.rows.length) {
        //         return res.status(201).json({ status: 201, data: votedQuestion.rows });
        //       }
        //     }).catch(error => res.status(500).json({ status: 500, error: `Error ${error}` }));
        //   } else {
        //     console.log('"user is among voters"');
        //     const { rows } = voterResult;
        //     if ((rows[0].vote).trim() === 'upvote') {
        //       const deleteVote = `DELETE FROM voters_table WHERE voted_by = '${user[0].id}' AND
        //       question_id = '${req.params.id}'`;
        //       Database.executeQuery(deleteVote).then((deleteResult) => {
        //         console.log(deleteResult);
        //       }).catch(error => res.status(500).json({ status: 500, error: `Server error ${error}` }));
        //       const reduceVote = `UPDATE question_table SET upvotes = upvotes -1 WHERE id = '${req.params.id}' RETURNING *`;
        //       Database.executeQuery(reduceVote).then((reduceResult) => {
        //         if (reduceResult.rows.length) {
        //           return res.status(201).json({ status: 201, data: reduceResult.rows });
        //         }
        //       }).catch(error => res.status(500).json({ status: 500, error: `Server error ${error}` }));
        //     } else {
        //       // switch user votes
        //       const updateVoters = `UPDATE voters_table SET vote = 'upvote' WHERE voted_by = 
        //       '${user[0].id}' AND question_id = '${req.params.id}'`;
        //       Database.executeQuery(updateVoters).then((updateVoterResult) => {
        //         console.log(updateVoterResult);
        //       }).catch(error => res.status(500).json({ status: 500, error: `Server error ${error}` }));
        //       const updateQuestion = `UPDATE question_table SET upvotes = upvotes + 1,downvotes = downvotes -1
        //       WHERE id = '${req.params.id}' `;
        //       Database.executeQuery(updateQuestion).then((updatedQuestions) => {
        //         res.status(201).json({ status: 201, data: updatedQuestions.rows });
        //       }).catch(error => res.status(500).json({ status: 500, error: `Server error : ${error}` }));
        //     }
        //   }
        // }).catch(error => res.status(500).json({ status: 500, error: `Server Error ${error}` }));

        break;
      case 'downvote':
        // check if the user have upvoted the same question and remove the vote or add it
        Database.executeQuery(checkSql).then((voterResult) => {
          if (!voterResult.rows.length) {
            console.log('user is not among voters');
            const newVoter = [
              uuid.v4(),
              new Date(),
              user[0].id,
              req.params.id,
              'downvote',
            ];
            const recorduserSql = `
                  INSERT INTO voters_table (id,created_on,voted_by,question_id,vote) VALUES ($1,$2,$3,$4,$5) RETURNING *`;
            Database.executeQuery(recorduserSql, newVoter).then((userResult) => {
              // console.log(userResult);
            }).catch(error => res.status(500).json({ status: 500, error: `Server error 1 ${error}` }));

            const voteSql = `UPDATE question_table SET downvotes = downvotes + 1 WHERE id ='${req.params.id}'
                   RETURNING *`;
            Database.executeQuery(voteSql).then((votedQuestion) => {
              if (votedQuestion.rows.length) {
                return res.status(201).json({ status: 201, data: votedQuestion.rows });
              }
            }).catch(error => res.status(500).json({ status: 500, error: `Error 2 ${error}` }));
          } else {
            console.log('"user is among voters"');
            const { rows } = voterResult;
            if ((rows[0].vote).trim() === 'downvotes') {
              const deleteVote = `DELETE FROM voters_table WHERE voted_by = '${user[0].id}' AND
                    question_id = '${req.params.id}'`;
              Database.executeQuery(deleteVote).then((deleteResult) => {
               // console.log(deleteResult);
              }).catch(error => res.status(500).json({ status: 500, error: `Server error 3 ${error}` }));
              const reduceVote = `UPDATE question_table SET downvotes = downvotes -1 WHERE id = '${req.params.id}' RETURNING *`;
              Database.executeQuery(reduceVote).then((reduceResult) => {
                console.log('Reduce result',reduceResult);
                if (reduceResult.rows.length) {
                  return res.status(201).json({ status: 201, data: reduceResult.rows });
                }
              }).catch(error => res.status(500).json({ status: 500, error: `Server error 4 ${error}` }));
            } else {
              // switch user votes
              const updateVoters = `UPDATE voters_table SET vote = 'downvote' WHERE voted_by = 
                    '${user[0].id}' AND question_id = '${req.params.id}' RETURNING *`;
              Database.executeQuery(updateVoters).then((updateVoterResult) => {
                console.log('Update voters ', updateVoterResult);
              }).catch(error => res.status(500).json({ status: 500, error: `Server error 5 ${error}` }));
              const updateQuestion = `UPDATE question_table SET downvotes = downvotes + 1,upvotes = upvotes -1
                    WHERE id = '${req.params.id}' RETURNING * `;
              Database.executeQuery(updateQuestion).then((updatedQuestions) => {
                if (updatedQuestions.rows.length) {
                 return res.status(201).json({ status: 201, data: updatedQuestions.rows });
                }
              }).catch(error => res.status(500).json({ status: 500, error: `Server error 6: ${error}` }));
            }
          }
        }).catch(error => res.status(500).json({ status: 500, error: `Server Error 7 ${error}` }));
        break;
      default:
        return false;
    }
  } catch (error) {
    return res.status(401).json({ status: 401, error: `Error 9 : ${error}` });
  }
};
