import questions from '../models/question';
import Helper from '../helpers/helpers';

const getQuestionById = (req, res) => {
  const questionById = questions.find(question => Helper.intCastCompare(req.params.id, question.id));
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
