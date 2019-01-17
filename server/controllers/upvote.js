import fs from 'fs';
import path from 'path';
import questions from '../models/question';

const voteQuestion = (req, res) => {
  const newQuestions = questions.filter((question) => {
    const userId = 1;
    if(parseInt(question.id, 10) === parseInt(req.params.id, 10)) {

    }

  });

  fs.writeFileSync(path.resolve(__dirname, '../data/questions.json'), JSON.stringify(newQuestions, null, 2));
  res.json({ status: 200, data: newQuestions });
};
export default voteQuestion;
