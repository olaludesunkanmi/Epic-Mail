"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSpecificEmail = exports.deleteEmail = exports.sendEmail = exports.getUnreadEmail = exports.getSentEmail = exports.getAllMessages = void 0;

var _messageDb = _interopRequireDefault(require("../data/messageDb"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MessageController =
/*#__PURE__*/
function () {
  function MessageController() {
    _classCallCheck(this, MessageController);
  }

  _createClass(MessageController, null, [{
    key: "getAllMessages",
    // Get all emails
    value: function getAllMessages(req, res) {
      return res.status(200).json({
        status: 200,
        data: _messageDb.default
      });
    } // Get a specific email.

  }, {
    key: "getSpecificEmail",
    value: function getSpecificEmail(req, res) {
      var foundEmail = _messageDb.default.find(function (message) {
        return message.id === Number(req.params.messageId);
      });

      if (!foundEmail) {
        return res.status(404).json({
          status: 404,
          error: 'Email was not found'
        });
      }

      return res.status(200).json({
        status: 200,
        data: [foundEmail]
      });
    } // Get all sent emails

  }, {
    key: "getSentEmail",
    value: function getSentEmail(req, res) {
      var sent = _messageDb.default.filter(function (message) {
        return message.status === 'sent';
      });

      if (sent.length === 0) {
        return res.status(404).json({
          status: 404,
          error: 'No sent items'
        });
      }

      return res.status(200).json({
        status: 200,
        data: sent
      });
    } // Get all unread messages

  }, {
    key: "getUnreadEmail",
    value: function getUnreadEmail(req, res) {
      var unread = _messageDb.default.filter(function (message) {
        return message.status === 'unread';
      });

      if (unread.length === 0) {
        return res.status(404).json({
          status: 404,
          error: 'No unread emails',
          data: 'unread'
        });
      }

      return res.status(200).json({
        status: 200,
        data: unread
      });
    } // Send an email

  }, {
    key: "sendEmail",
    value: function sendEmail(req, res) {
      var newMessage = {
        id: _messageDb.default.length + 1,
        createdOn: new Date().toUTCString(),
        subject: req.body.subject,
        message: req.body.message,
        senderId: 1,
        receiverId: _messageDb.default.length - 1,
        parentMessageId: _messageDb.default.length + 1,
        status: 'sent'
      };

      _messageDb.default.push(newMessage);

      return res.status(201).json({
        status: 201,
        data: [newMessage]
      });
    } // Delete an email

  }, {
    key: "deleteEmail",
    value: function deleteEmail(req, res) {
      var email = _messageDb.default.find(function (message) {
        return message.id === Number(req.params.messageId);
      });

      if (!email) {
        return res.status(404).json({
          status: 404,
          error: 'The message was not found!'
        });
      }

      var index = _messageDb.default.indexOf(email);

      _messageDb.default.splice(index, 1);

      return res.status(200).json({
        status: 200,
        data: [{
          message: 'Email has been successfully deleted'
        }]
      });
    }
  }]);

  return MessageController;
}();

var getAllMessages = MessageController.getAllMessages,
    getSentEmail = MessageController.getSentEmail,
    getUnreadEmail = MessageController.getUnreadEmail,
    sendEmail = MessageController.sendEmail,
    deleteEmail = MessageController.deleteEmail,
    getSpecificEmail = MessageController.getSpecificEmail;
exports.getSpecificEmail = getSpecificEmail;
exports.deleteEmail = deleteEmail;
exports.sendEmail = sendEmail;
exports.getUnreadEmail = getUnreadEmail;
exports.getSentEmail = getSentEmail;
exports.getAllMessages = getAllMessages;