import { Router } from 'express';
import { AuthController } from '../infrastructure/controller/AuthController';

const authRouter = Router();

const authController = new AuthController();

authRouter.post('/register', (req, res) => {
    authController.createUserEmail(req, res);
});
authRouter.post('/send-email-code-password', (req, res) => {
    authController.sendEmailCodeVerificationPassword(req, res);
});
authRouter.post('/change-username', (req, res) => {
    authController.changeUsername(req, res);
});
authRouter.post('/login-email', (req, res) => {
    authController.loginEmail(req, res);
});
authRouter.post('/update-password', (req, res) => {
    authController.updatePassword(req, res);
});
authRouter.post('/register-google', (req, res) => {
    authController.createUserGoogle(req, res);
});
authRouter.post('/login-google', (req, res) => {
    authController.loginUserGoogle(req, res);
})
export default authRouter;