import express from 'express';
import {
  getAllMessages, getSentEmail, getUnreadEmail, sendEmail,
  deleteEmail, getSpecificEmail,
} from '../controllers/messageController';
import MessageValidator from '../helpers/messageValidator';
import { verifyToken } from '../helpers/helper';

const messageRouter = express.Router();

// Destructure email validator for the class.
const { emailValidator } = MessageValidator;

// Message routes
messageRouter.get('/', verifyToken, getAllMessages);
messageRouter.post('/', verifyToken, emailValidator, sendEmail);
messageRouter.get('/sent', verifyToken, getSentEmail);
messageRouter.get('/unread', verifyToken, getUnreadEmail);
messageRouter.get('/:messageId', verifyToken, getSpecificEmail);
messageRouter.delete('/:messageId', verifyToken, deleteEmail);

export default messageRouter;
