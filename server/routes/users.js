import express from 'express';
import UserController from '../controllers/userController';
import UserValidator from "../helpers/userValidator";

const { signUp, login } = UserController;
const { signUpValidator, loginValidator } = UserValidator;

const userRouter = express.Router();

userRouter.post('/signup', signUpValidator, signUp);
userRouter.post('/login', loginValidator, login);

export default userRouter;
