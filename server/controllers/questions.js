import questions from '../models/question';
const getQuestions = async (req, res) => res.json({
    status:200,
    data:await questions()
});
export default getQuestions;
