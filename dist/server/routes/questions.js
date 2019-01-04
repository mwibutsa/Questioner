'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _addQuestion = require('../controllers/add-question');

var _addQuestion2 = _interopRequireDefault(_addQuestion);

var _upvoteQuestion = require('../controllers/upvote-question');

var _upvoteQuestion2 = _interopRequireDefault(_upvoteQuestion);

var _downvoteQuestion = require('../controllers/downvote-question');

var _downvoteQuestion2 = _interopRequireDefault(_downvoteQuestion);

var _questions = require('../controllers/questions');

var _questions2 = _interopRequireDefault(_questions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/', _questions2.default);
router.post('/', _addQuestion2.default);
router.put('/upvote', _upvoteQuestion2.default);
router.put('/downvote', _downvoteQuestion2.default);

exports.default = router;