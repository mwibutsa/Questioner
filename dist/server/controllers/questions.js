'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _question = require('../models/question');

var _question2 = _interopRequireDefault(_question);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getQuestions = function getQuestions(req, res) {
    return res.json({
        status: 200,
        data: _question2.default
    });
};
exports.default = getQuestions;