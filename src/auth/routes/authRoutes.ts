import {Router} from 'express';
import { AuthController } from '../infrastructure/controller/AuthController';

const authRouter = Router();

const authController = new AuthController();

authRouter.post('/register', (req, res) => {
    authController.createUserEmail(req, res);
});

export default authRouter;