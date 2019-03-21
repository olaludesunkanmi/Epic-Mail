class MessageValidator {
    static emailValidator(req, res, next) {
      let { subject, message, receiver } = req.body;
      // No blank subject allowed
      if (!subject) {
        return res.status(400).json({
          status: 400,
          error: 'Subject is required',
        });
      }
      // No message subject allowed
      if (!message) {
        return res.status(400).json({
          status: 400,
          error: 'Message is required',
        });
      }
      // // No receiver subject allowed
      // if (!receiver) {
      //   return res.status(400).json({
      //     status: 400,
      //     error: 'Receiver is required',
      //   });
      // }
      req.body.subject = subject;
      req.body.message = message;
      req.body.receiver = receiver;
      return next();
    }
  }
  export default MessageValidator;
  