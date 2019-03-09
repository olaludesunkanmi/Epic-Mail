import messages from '../data/messagedb';

class MessageController {
  // Get all emails
  static getAllMessages(req, res) {
    return res.status(200).json({
      status: 200,
      data: messages,
    });
  }

  // Get a specific email.
  static getSpecificEmail(req, res) {
    const foundEmail = messages.find(message => message.id === Number(req.params.messageId));
    if (!foundEmail) {
      return res.status(404).json({
        status: 404,
        error: 'Email was not found',
      });
    }
    return res.status(200).json({
      status: 200,
      data: [foundEmail],
    });
  }

  // Get all sent emails
  static getSentEmail(req, res) {
    const sent = messages.filter(message => message.status === 'sent');
    if (sent.length === 0) {
      return res.status(404).json({
        status: 404,
        error: 'No sent items',
      });
    }
    return res.status(200).json({
      status: 200,
      data: sent,
    });
  }

  // Get all unread messages
  static getUnreadEmail(req, res) {
    const unread = messages.filter(message => message.status === 'unread');
    if (unread.length === 0) {
      return res.status(404).json({
        status: 404,
        error: 'No unread emails',
        data: 'unread',
      });
    }
    return res.status(200).json({
      status: 200,
      data: unread,
    });
  }

  // Send an email
  static sendEmail(req, res) {
    const newMessage = {
      id: messages.length + 1,
      createdOn: new Date().toUTCString(),
      subject: req.body.subject,
      message: req.body.message,
      senderId: 1,
      receiverId: messages.length - 1,
      parentMessageId: messages.length + 1,
      status: 'sent',
    };
    messages.push(newMessage);
    return res.status(201).json({
      status: 201,
      data: [newMessage],
    });
  }

  // Delete an email
  static deleteEmail(req, res) {
    const email = messages.find(message => message.id === Number(req.params.messageId));
    if (!email) {
      return res.status(404).json({
        status: 404,
        error: 'The message was not found!',
      });
    }
    const index = messages.indexOf(email);
    messages.splice(index, 1);
    return res.status(200).json({
      status: 200,
      data: [{
        message: 'Email has been successfully deleted',
      }],
    });
  }
}

export const {
  getAllMessages, getSentEmail, getUnreadEmail, sendEmail,
  deleteEmail, getSpecificEmail,
} = MessageController;
