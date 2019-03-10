"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _messageController = require("../controllers/messageController");

var _messageValidator = _interopRequireDefault(require("../helpers/messageValidator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var messageRouter = _express.default.Router(); // Destructure email validator for the class.


var emailValidator = _messageValidator.default.emailValidator; // Message routes

messageRouter.get('/', _messageController.getAllMessages);
messageRouter.post('/', emailValidator, _messageController.sendEmail);
messageRouter.get('/sent', _messageController.getSentEmail);
messageRouter.get('/unread', _messageController.getUnreadEmail);
messageRouter.get('/:messageId', _messageController.getSpecificEmail);
messageRouter.delete('/:messageId', _messageController.deleteEmail);
var _default = messageRouter;
exports.default = _default;