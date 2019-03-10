"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _userController = _interopRequireDefault(require("../controllers/userController"));

var _userValidator = _interopRequireDefault(require("../helpers/userValidator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var signUp = _userController.default.signUp,
    login = _userController.default.login;
var signUpValidator = _userValidator.default.signUpValidator,
    loginValidator = _userValidator.default.loginValidator;

var userRouter = _express.default.Router();

userRouter.post('/signup', signUpValidator, signUp);
userRouter.post('/login', loginValidator, login);
var _default = userRouter;
exports.default = _default;