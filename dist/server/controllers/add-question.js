'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _question = require('../models/question');

var _question2 = _interopRequireDefault(_question);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var addQuestion = function addQuestion(req, res) {
  var newQuestion = {
    id: _question2.default.length + 1,
    createdOn: new Date(),
    createdBy: 1,
    meetup: req.params.id,
    title: req.body.title,
    body: req.body.question,
    votes: 0
  };
  _question2.default.push(newQuestion);
  _fs2.default.writeFileSync('./data/questions.json', JSON.stringify(_question2.default, null, 2));
  res.json({ status: 200, data: _question2.default });
};

exports.default = addQuestion;