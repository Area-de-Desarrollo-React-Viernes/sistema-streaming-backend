import { HandlerException } from "../../../shared/domain/HandlerException";
import { CreateUserDTO } from "../dto/request/CreateUserDTO";
import { Request } from 'express';

export class InstanceCreateUserDTO {
    static instance(req: Request): CreateUserDTO {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            throw new HandlerException('Faltan datos obligatorios para crear el usuario', 400);
        }
        return new CreateUserDTO(
            username,
            email,
            password
        );
    }
}