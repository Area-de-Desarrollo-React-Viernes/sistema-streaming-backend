import e, { Request, Response } from "express";
import { paymentContainer } from "../../../shared/infrastructure/container/PaymentContainer";
import { UserEmail } from "../../domain/entities/value-objects/UserEmail";
import { UserName } from "../../domain/entities/value-objects/UserName";
import { HandlerException } from "../../../shared/domain/HandlerException";
import { responseException } from "../../../shared/utils/ResponseException";

export class PaymentController {
    async paymentPremium(req: Request, res: Response): Promise<void> {
        try{
            const userId = (req as any).user.sub;
            const {planType} = req.body;
            const data = await paymentContainer.paymentPremium.run(
                userId,
                new UserEmail('test_user_2128412865@testuser.com'), 
                new UserName('Zambrano'), 
                planType);
            res.status(200).json({
                success: true,
                data
            });
        }catch(error: HandlerException | any){
            responseException(res, error);
        }
    }
}