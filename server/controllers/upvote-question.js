import fs from 'fs';
import questions from '../models/question';
const upvoteQuestion = (req, res) => {
 const  newQuestions = questions.filter((question) => {
    if (parseInt(question.id) === parseInt(req.params.id)) {
      question.votes += 1;
    }
    return question;
  });
  fs.writeFileSync('./data/questions.json',JSON.stringify(newQuestions,null,2));
  res.json({status:200,data:newQuestions});
};
export default upvoteQuestion;