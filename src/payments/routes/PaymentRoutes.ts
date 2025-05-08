import { Router } from "express";
import { PaymentController } from "../infrastructure/controller/PaymentController";

const paymentRouter = Router();
const paymentController = new PaymentController();

paymentRouter.post('/premium', (req, res) => {
    paymentController.paymentPremium(req, res);
});

export default paymentRouter;