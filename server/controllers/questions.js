import questions from '../models/question';
import Helper from '../helpers/helpers';

const getQuestions = (req, res) => {
  const questionsOnMeetup = questions.find(question => Helper.intCastCompare(req.params.id, question.meetup));
  if (questionsOnMeetup) {
    return res.json({
      status: 200,
      data: questionsOnMeetup,
    });
  }

  return res.json({
    status: 400,
    error: 'No questions are found on This meetup',
  });
};

export default getQuestions;
