import fs from 'fs';
import questions from '../models/questions';
const downvoteQuestion = (req, res) => {
  questions = questions.filter((question) => {
    if (parseInt(question.id) === parseInt(req.params.id)) {
      question.votes -= 1;
    }
    return question;
  });
  fs.writeFileSync('./data/questions.json',JSON.stringify(questions,null,2));
  res.json(questions);
};
export default downVoteQuestion;