'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _meetups = require('../controllers/meetups');

var _meetups2 = _interopRequireDefault(_meetups);

var _addMeetup = require('../controllers/add-meetup');

var _addMeetup2 = _interopRequireDefault(_addMeetup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/', _meetups2.default);
router.post('/', _addMeetup2.default);
// router.delete('/',deleteMeetup);

exports.default = router;