import { HandlerException } from "../../../shared/domain/HandlerException";
import { CredentialRequest } from "../dto/request/CredentialRequest";
import { Request } from "express";

export class InstanceCreadentialRequest {
    static instance(req: Request): CredentialRequest {
        const { email, password } = req.body;

        if (!password || !email) {
            throw new HandlerException('Faltan datos obligatorios para crear el usuario', 400);
        }
        return new CredentialRequest(
            email,
            password,
        );
    }
}