import fs from 'fs';
import path from 'path';
import questions from '../models/question';

const compare = (value1, value2) => parseInt(value1, 10) === parseInt(value2, 10);
const voteQuestion = (req, res) => {
  // current logged in user id
  const userId = 1;
  // grab the question to vote
  const question = questions.find(question => compare(question.id, req.params.id));
  // of the question is found
  if (question) {
    console.log(question);
    // remove the question from array before votes
    questions.splice(questions.indexOf(question));
    // check if the user have not voted of upvoted the same
    console.log(question.upvotedBy);
    if (!(question.upvotedBy.find(user_id => compare(user_id, userId))) && !(question.downvotedBy.find(user_id => compare(user_id, userId)))) {
      question.upvotes += 1;
      question.upvotedBy.push(userId);
    }
    // if none of the above then check if the user have downvoted and shift the vote to upvote
    else if (question.downvotedBy.find(user_id => compare(user_id, userId))) {
      question.upvotes += 1; // increase upvotes
      question.downvotes -= 1; // decrease downvotes
      question.upvotedBy.push(userId); // shift the user from downvoted to upvoted users
      question.downvotedBy.splice(question.downvotedBy.indexOf(userId), 1); // remove user from downvoted users
    }
  }

  // update the  questions array after votes
  questions.push(question);

  fs.writeFileSync(path.resolve(__dirname, '../data/questions.json'), JSON.stringify(questions, null, 2));
  res.json({
    status: 201,
    data: question,
  });
};
export default voteQuestion;
