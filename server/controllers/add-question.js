import fs from 'fs';
import path from 'path';
import joi from 'joi';
import questions from '../models/question';
import Validation from '../helpers/validation';
const addQuestion = (req, res) => {
  joi.validate(req.body, Validation.questionSchema, Validation.validationOption, (err, result) => {
    if (err) {
      return res.json({
        status: 400,
        error:[...err.details]
      });
    }

    const userId = 1;
    const newQuestion = {
      id: questions.length + 1,
      createdOn: new Date(),
      createdBy: userId,
      meetup: req.params.id,
      title: req.body.title,
      body: req.body.question,
      upvotes: 0,
      downvotes: 0,
      upvotedBy: [],
      downVotedBy: [],
    };
    questions.push(newQuestion);
    fs.writeFileSync(path.resolve(__dirname, '../data/questions.json'), JSON.stringify(questions, null, 2));
    res.json({ status: 200, data: newQuestion });
  });
};

export default addQuestion;
