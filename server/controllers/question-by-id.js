import questions from '../models/question';

const getQuestionById = async (req, res) => {
  const allQuestions = await questions();
  const questionById = allQuestions.find(question => question.id === req.params.id);
  if (questionById) {
    return res.json({
      status: 200,
      data: questionById,
    });
  }
  return res.json({
    status: 404,
    error: 'The meetup with given id is not found',
  });
};
export default getQuestionById;
