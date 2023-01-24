import { Router } from 'express';
import { loginValidation, tokenValidation } from '../middlewares/loginValidation';
import userController from '../controllers/user.controller';

const userRouter = Router();

userRouter.post('/', loginValidation, userController.getUserByEmail);
userRouter.get('/validate', tokenValidation, userController.getUserRole);

export default userRouter;
