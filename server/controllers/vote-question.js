import fs from 'fs';
import questions from '../models/question';
import path from 'path';
const voteQuestion = (req, res) => {
 const  newQuestions = questions.filter((question) => {
   let vote = '';
   vote = req.params.voteMethod;
   vote = vote.toLocaleUpperCase();

    if (parseInt(question.id) === parseInt(req.params.id)) {
      if(vote === 'upvote' || vote === 'up-vote')
      {question.votes += 1;}
      else if(vote === 'downvote' || vote === 'down-vote'){
        question.votes -=1;
      }

    }
    return question;
  });
  fs.writeFileSync(path.resolve(__dirname,'../data/questions.json'),JSON.stringify(newQuestions,null,2));
  res.json({status:200,data:newQuestions});
};
export default voteQuestion;