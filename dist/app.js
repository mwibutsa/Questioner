'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _meetups = require('./server/routes/meetups');

var _meetups2 = _interopRequireDefault(_meetups);

var _questions = require('./server/routes/questions');

var _questions2 = _interopRequireDefault(_questions);

var _reservations = require('./server/routes/reservations');

var _reservations2 = _interopRequireDefault(_reservations);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var port = process.env.PORT || 3000;
var app = (0, _express2.default)();
app.set('port', port);
app.listen(app.get('port'), function () {
    console.log('server started on port ' + port);
});