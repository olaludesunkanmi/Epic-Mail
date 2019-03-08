import express from 'express';
import UserController from '../controllers/userController';
import UserValidator from "../helpers/UserValidator";

const { signUp, login } = UserController;
const { signUpValidator, loginValidator } = UserValidator;

const router = express.Router();

router.post('/auth/signup', signUpValidator, signUp);
router.post('/auth/login', loginValidator, login);

export default router;
