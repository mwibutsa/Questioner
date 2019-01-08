import Database from '../database/db_connection';
import questions from '../models/question';

const voteQuestion = async (req, res) => {
    const allQuestions = await questions();
    const question = allQuestions.find(question => question.id == req.params.id);
    let votes = question.votes;

    const voteMethod = req.params.voteMethod.toLowerCase();

    if(voteMethod === 'upvote' || voteMethod === 'up-vote') votes  += 1;
    else if(voteMethod === 'downvote' || voteMethod === 'down-vote') votes -= 1;
    else return res.json({ status:404,error:"Page not found"});

    const voteQuery = `UPDATE question_table SET votes = ${votes} WHERE id = '${req.params.id}'`;
    const updateResult = await Database.executeQuery(voteQuery);
    res.json(allQuestions);
  }
export default voteQuestion;