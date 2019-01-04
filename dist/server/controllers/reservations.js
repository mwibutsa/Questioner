'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _reservation = require('../models/reservation');

var _reservation2 = _interopRequireDefault(_reservation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var attendMeetup = function attendMeetup(req, res) {
  var newReservation = {
    id: _reservation2.default.length + 1,
    meetup_id: req.params.id,
    user_id: 1,
    answer: req.body.answer
  };
  _reservation2.default.push(newReservation);
  _fs2.default.writeFileSync('./data/reservation.json', JSON.stringify(_reservation2.default, null, 2));
  return res.json({ status: 200, data: _reservation2.default });
};

exports.default = attendMeetup;