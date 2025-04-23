import { HandlerException } from "../../../shared/domain/HandlerException";
import { CreateUserRequest } from "../dto/request/CreateUserRequest";
import { Request } from 'express';

export class InstanceCreateUserRequest {
    static instance(req: Request): CreateUserRequest {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            throw new HandlerException('Faltan datos obligatorios para crear el usuario', 400);
        }
        return new CreateUserRequest(
            username,
            email,
            password
        );
    }
}