import fs from 'fs';
import questions from '../models/question';
import path from 'path';
const upvoteQuestion = (req, res) => {
 const  newQuestions = questions.filter((question) => {
    if (parseInt(question.id) === parseInt(req.params.id)) {
      question.votes += 1;
    }
    return question;
  });
  fs.writeFileSync(path.resolve(__dirname,'../data/questions.json'),JSON.stringify(newQuestions,null,2));
  res.json({status:200,data:newQuestions});
};
export default upvoteQuestion;