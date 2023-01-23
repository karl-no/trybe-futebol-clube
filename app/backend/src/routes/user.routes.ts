import { Router } from 'express';
import loginValidation from '../middlewares/loginValidation';
import userController from '../controllers/user.controller';

const router = Router();

router.post('/', loginValidation, userController.getUserByEmail);

export default router;
