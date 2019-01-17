import fs from 'fs';
import path from 'path';
import questions from '../models/question';
import Helper from '../helpers/helpers';


const voteQuestion = (req, res) => {
  const userId = 1;
  const voteResult = Helper.processVote('upvote', questions, req.params.id, userId);
  const modifiedQuestions = voteResult.questions;
  const votedQuestion = voteResult.question;
  fs.writeFileSync(path.resolve(__dirname, '../data/questions.json'), JSON.stringify(modifiedQuestions, null, 2));
  res.json({
    status: 201,
    data: votedQuestion,
  });
};
export default voteQuestion;
