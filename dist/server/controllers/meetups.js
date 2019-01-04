'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _meetup = require('../models/meetup');

var _meetup2 = _interopRequireDefault(_meetup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getMeetups = function getMeetups(req, res) {
	return res.json({
		status: 200,
		data: _meetup2.default
	});
};

exports.default = getMeetups;