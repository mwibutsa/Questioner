import fs from 'fs';
import questions from '../models/question';
const addQuestion = (req, res) => {
  const newQuestion = {
    id:questions.length + 1,
    createdOn: new Date(),
    createdBy: 1,
    meetup: req.params.id,
    title: req.body.title,
    body: req.body.question,
    votes: 0,
  };
  questions.push(newQuestion);
  fs.writeFileSync(path.resolve(__dirname,'../data/questions.json'),JSON.stringify(questions,null,2));
  res.json({status:200,data:questions});
};

export default addQuestion;