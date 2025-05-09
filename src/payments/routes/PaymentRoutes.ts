import { Router } from "express";
import { PaymentController } from "../infrastructure/controller/PaymentController";
import { AuthorizationMiddleware } from "../../shared/infrastructure/middleware/AuthorizationMiddleware";
import { inspectWebhook } from "../infrastructure/Middleware/PaymentWebhook";
import { changeStatusPayment } from "../infrastructure/webhook/ChangeStatusPaymentWebhook";

const paymentRouter = Router();
const paymentController = new PaymentController();

paymentRouter.post('/plans', AuthorizationMiddleware, (req, res) => {
    paymentController.paymentPremium(req, res);
});
paymentRouter.post('/inspect-webhook', changeStatusPayment);

export default paymentRouter;