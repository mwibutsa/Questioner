'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _question = require('../models/question');

var _question2 = _interopRequireDefault(_question);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var upvoteQuestion = function upvoteQuestion(req, res) {
  var newQuestions = _question2.default.filter(function (question) {
    if (parseInt(question.id) === parseInt(req.params.id)) {
      question.votes += 1;
    }
    return question;
  });
  _fs2.default.writeFileSync('./data/questions.json', JSON.stringify(newQuestions, null, 2));
  res.json({ status: 200, data: newQuestions });
};
exports.default = upvoteQuestion;