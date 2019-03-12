import express from 'express';
import UserController from '../controllers/userC';
import UserValidator from "../helpers/userValidator";

const { signUp, login } = UserController;
const { signUpValidator, loginValidator } = UserValidator;

const userRouter = express.Router();

router.post('/signup', signUpValidator, signUp);
router.post('/login', loginValidator, login);

export default userRouter;
