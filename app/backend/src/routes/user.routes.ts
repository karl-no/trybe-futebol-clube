import { Router } from 'express';
import { loginValidation, tokenValidation } from '../middlewares/loginValidation';
import userController from '../controllers/user.controller';

const router = Router();

router.post('/', loginValidation, userController.getUserByEmail);
router.get('/validate', tokenValidation, userController.getUserRole);

export default router;
