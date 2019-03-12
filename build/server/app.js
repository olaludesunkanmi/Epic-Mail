"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("dotenv/config");

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _users = _interopRequireDefault(require("./routes/users"));

var _messages = _interopRequireDefault(require("./routes/messages"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PORT = 3000;
var app = (0, _express.default)();
app.use(_bodyParser.default.urlencoded({
  extended: true
}));
app.use(_bodyParser.default.json());
app.use('/api/v1/auth', _users.default);
app.use('/api/v1/messages', _messages.default);
app.get('/', function (req, res) {
  return res.status(200).json({
    status: 200,
    data: [{
      message: 'Sign in successful'
    }]
  });
}); // Handle non existing route with with proper message

app.all('*', function (req, res) {
  return res.status(404).json({
    status: 404,
    error: 'Route does not exist'
  });
});
app.listen(PORT, function () {
  return console.log("Running on localhost:".concat(PORT));
});
var _default = app;
exports.default = _default;