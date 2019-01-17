import fs from 'fs';
import path from 'path';
import questions from '../models/question';

const addQuestion = (req, res) => {
  const newQuestion = {
    id: questions.length + 1,
    createdOn: new Date(),
    createdBy: 1,
    meetup: req.params.id,
    title: req.body.title,
    body: req.body.question,
    upvotes: 0,
    downvotes: 0,
    votedBy: [],
  };
  questions.push(newQuestion);
  fs.writeFileSync(path.resolve(__dirname, '../data/questions.json'), JSON.stringify(questions, null, 2));
  res.json({ status: 200, data: newQuestion });
};

export default addQuestion;
