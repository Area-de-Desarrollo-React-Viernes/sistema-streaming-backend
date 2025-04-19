import { UserContainer } from "../../../shared/infrastructure/container/UserContainer";
import { Request, Response } from 'express';
import { HandlerException } from "../../../shared/domain/HandlerException";
import { responseException } from "../../../shared/utils/ResponseException";
import { InstanceUserInfoRequest } from "../../application/utils/InstanceUserInfoRequest";
import { InstanceCreateUserRequest } from "../../application/utils/InstanceCreateUserRequest";
import { InstanceCreadentialRequest } from "../../application/utils/InstanceCredentialRequest";
import { ChangeVerifiedPassword } from "../../application/use-case/ChangeVerifiedPassword";
import { InstanceChangeVerifiedPassword } from "../../application/utils/InstanceChangeVerifiedPassword";
export class AuthController {
    async createUserEmail(req: Request, res: Response): Promise<void> {
        try {
            const user = await UserContainer.createUserEmail.run(InstanceCreateUserRequest.instance(req));
            res.status(201).json({
                data: user
            });
        } catch (error: HandlerException | any) {
            responseException(res, error);
        }
    }
    async sendEmailCodeVerificationPassword(req: Request, res: Response): Promise<void> {
        try{    
            await UserContainer.sendCodeVerificationEmail.run(req.body.email);
            res.status(201).json({
                data:{
                    success: true,
                    message: 'Se envio el email con codigo de verificación'
                }
            });
        }catch(error: HandlerException | any){
            responseException(res, error);
        }
    }
    async changeUsername(req: Request, res: Response): Promise<void> {
        try{
            await UserContainer.changeUsername.run(InstanceUserInfoRequest.instance(req));
            res.status(201).json({
                data:{
                    success: true,
                    message: 'Se envio el email con codigo de verificación'
                }
            });
        }catch(error: HandlerException | any){
            responseException(res, error);
        }
    }
    async loginEmail(req: Request, res: Response): Promise<void> {
        try{
            const  token = await UserContainer.loginEmail.run(InstanceCreadentialRequest.instance(req));
            res.status(201).json({
                data: {
                    success: true,
                    message: token
                }
            });
        }catch(error: HandlerException | any){
            responseException(res, error);
        }
    }
    async updatePassword(req: Request, res: Response): Promise<void> {
        try{
            await UserContainer.changePassword.run(InstanceChangeVerifiedPassword.instance(req));
            res.status(201).json({
                data:{
                    success: true,
                    message: 'Se actualizo su contrseña'
                }
            });
        }catch(error: HandlerException | any){
            responseException(res, error);
        }
    }
    async createUserGoogle(req: Request, res: Response): Promise<void> {
        try{
            await UserContainer.createUserGoogle.run(req.body.token);
            res.status(201).json({
                data:{
                    success: true,
                    message: 'Se registro exitosamente con Google'
                }
            });
        }catch(error: HandlerException | any){
            responseException(res, error);
        }
    }
}