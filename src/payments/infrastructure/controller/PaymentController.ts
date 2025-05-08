import e, { Request, Response } from "express";
import { paymentContainer } from "../../../shared/infrastructure/container/PaymentContainer";
import { UserEmail } from "../../domain/entities/value-objects/UserEmail";
import { UserName } from "../../domain/entities/value-objects/UserName";
import { HandlerException } from "../../../shared/domain/HandlerException";
import { responseException } from "../../../shared/utils/ResponseException";

export class PaymentController {
    async paymentPremium(req: Request, res: Response): Promise<void> {
        try{
            //const {email, name} = req.body;
            const data = await paymentContainer.paymentPremium.run(new UserEmail('test_user_852261725@testuser.com'), new UserName('Luis Fernando'));
            res.status(200).json({
                success: true,
                data
            });
        }catch(error: HandlerException | any){
            responseException(res, error);
        }
    }
}