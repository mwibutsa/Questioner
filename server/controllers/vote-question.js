import fs from 'fs';
import questions from '../models/question';
import path from 'path';
const voteQuestion = (req, res) => {
 const  newQuestions = questions.filter((question) => {
 const  vote = (req.params.voteMethod).toLowerCase();

    if (parseInt(question.id) === parseInt(req.params.id)) {
      if(vote === 'upvote' || vote === 'up-vote')
      {question.votes += 1;}
      else if(vote === 'downvote' || vote === 'down-vote'){
        question.votes -=1;
      }
      else{
        res.json({
          status:404,
          errror:"Page not found"
        });
      }

    }
    return question;
  });
  fs.writeFileSync(path.resolve(__dirname,'../data/questions.json'),JSON.stringify(newQuestions,null,2));
  res.json({status:200,data:newQuestions});
};
export default voteQuestion;