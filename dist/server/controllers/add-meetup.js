'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _meetup = require('../models/meetup');

var _meetup2 = _interopRequireDefault(_meetup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var addMeetup = function addMeetup(req, res) {
  var newMeetup = {
    id: _meetup2.default.length + 1 | 1,
    createdOn: new Date(),
    images: 'fileName',
    location: req.body.location,
    topic: req.body.topic,
    happeningOn: req.body.happeningOn,
    tags: req.body.tags
  };
  _meetup2.default.push(newMeetup);
  _fs2.default.writeFileSync('./data/meetups.json', JSON.stringify(_meetup2.default, null, 2));
  res.json({ status: 200, data: _meetup2.default });
};
exports.default = addMeetup;