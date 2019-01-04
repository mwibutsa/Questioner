'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var meetups = [];
var meetup = _fs2.default.readFileSync(_path2.default.resolve(__dirname, '../data/meetups.json'), { encoding: 'utf8' });
meetups = JSON.parse(meetup);
exports.default = meetups;