"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MessageValidator =
/*#__PURE__*/
function () {
  function MessageValidator() {
    _classCallCheck(this, MessageValidator);
  }

  _createClass(MessageValidator, null, [{
    key: "emailValidator",
    value: function emailValidator(req, res, next) {
      var _req$body = req.body,
          subject = _req$body.subject,
          message = _req$body.message; // No blank subject allowed

      if (!subject) {
        return res.status(400).json({
          status: 400,
          error: 'Subject is required'
        });
      } // Change subject to lowercase and remove whitespaces


      subject = subject.toLowerCase().trim(); // No message subject allowed

      if (!message) {
        return res.status(400).json({
          status: 400,
          error: 'Message is required'
        });
      } // Change message to lowercase and remove whitespaces


      message = message.toLowerCase().trim();
      req.body.subject = subject;
      req.body.message = message;
      return next();
    }
  }]);

  return MessageValidator;
}();

var _default = MessageValidator;
exports.default = _default;