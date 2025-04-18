import { UserContainer } from "../../../shared/infrastructure/container/UserContainer";
import { Request, Response } from 'express';
import { InstanceCreateUserDTO } from "../../application/utils/InstanceCreateUserDTO";
import { HandlerException } from "../../../shared/domain/HandlerException";
export class AuthController {
    async createUserEmail(req: Request, res: Response): Promise<void> {

        try{
            const user = await UserContainer.createUserEmail.run(InstanceCreateUserDTO.instance(req));
            res.status(201).json({
                data: user
            });
        }catch (error: HandlerException | any) {
            res.status(error.errorCode).json({
                error: {
                    message: error.message,
                    code: error.errorCode
                }
            });
        }
    }
}