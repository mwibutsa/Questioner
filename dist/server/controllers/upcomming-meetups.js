'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _meetup = require('../models/meetup');

var _meetup2 = _interopRequireDefault(_meetup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getUpcommingMeetups = function getUpcommingMeetups(req, res) {
  var now = new Date();
  now = now.getTime();
  var upComming = meetups.filter(function (meetup) {
    var intDate = meetup.happeningOn.split('-');
    var date = new Date(parseInt(intDate[2]), parseInt(intDate[1]), parseInt(intDate[0]));
    if (date.getTime() > new Date().getTime()) {
      return meetup;
    }
  });

  if (upComming) {
    res.json({ status: 200, data: upComming });
  } else {
    res.json({
      status: 404,
      error: 'No upcomming meetups'
    });
  }
};
exports.default = getUpcommingMeetups;