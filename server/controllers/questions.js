import questions from '../models/question';

const getQuestions = (req, res) => res.json({
  status: 200,
  data: questions,
});
export default getQuestions;
