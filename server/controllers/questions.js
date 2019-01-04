import questions from '../models/questions';
const getQuestions = (req, res) => res.json(questions);
export default getQuestions;
