"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _userDb = _interopRequireDefault(require("../data/userDb"));

var _helper = _interopRequireDefault(require("../helpers/helper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var generateToken = _helper.default.generateToken;

var UserController =
/*#__PURE__*/
function () {
  function UserController() {
    _classCallCheck(this, UserController);
  }

  _createClass(UserController, null, [{
    key: "signUp",
    value: function signUp(req, res) {
      var newUser = {
        id: _userDb.default.length + 1,
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password
      };
      var token = generateToken(newUser);

      _userDb.default.push(newUser);

      return res.status(201).json({
        status: 201,
        data: [{
          token: token
        }]
      });
    }
  }, {
    key: "login",
    value: function login(req, res) {
      var foundUser = req.body.foundUser;
      var token = generateToken(foundUser);
      return res.status(200).json({
        status: 200,
        data: [{
          token: token
        }]
      });
    }
  }]);

  return UserController;
}();

var _default = UserController;
exports.default = _default;