import express from 'express';
import {
  getAllMessages, getSentEmail, getUnreadEmail, sendEmail,
  deleteEmail, getSpecificEmail,
} from '../controllers/messageController';
import MessageValidator from '../helpers/messageValidator';

const messageRouter = express.Router();

// Destructure email validator for the class.
const { emailValidator } = MessageValidator;

// Message routes
messageRouter.get('/messages', getAllMessages);
messageRouter.post('/messages', emailValidator, sendEmail);
messageRouter.get('/messages/sent', getSentEmail);
messageRouter.get('/messages/unread', getUnreadEmail);
messageRouter.get('/messages/:messageId', getSpecificEmail);
messageRouter.delete('/messages/:messageId', deleteEmail);

export default messageRouter;
