'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _reservations = require('../controllers/reservations');

var _reservations2 = _interopRequireDefault(_reservations);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post('/:id/rsvp', _reservations2.default);
exports.default = router;