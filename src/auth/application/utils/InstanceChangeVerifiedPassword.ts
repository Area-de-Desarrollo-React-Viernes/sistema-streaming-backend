import { Request } from "express";
import { UpdatePasswordRequest } from "../dto/request/UpdatePasswordRequest";
import { HandlerException } from "../../../shared/domain/HandlerException";

export class InstanceChangeVerifiedPassword {
    static instance(req: Request): UpdatePasswordRequest {
        const { code, email, new_password, new_password_confirmed } = req.body;

        if (!code || !email || !new_password || !new_password_confirmed) {
            throw new HandlerException('Faltan datos obligatorios para crear el usuario', 400);
        }
        if(new_password !== new_password_confirmed){
            throw new HandlerException('No coincide su nueva contraseña', 400);
        }
        return new UpdatePasswordRequest(
            code,
            new_password,
            email,
        );
    }
}