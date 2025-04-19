import { Request } from 'express';
import { HandlerException } from '../../../shared/domain/HandlerException';
import { UserInfoRequest } from '../dto/request/UserInfoRequest';

export class InstanceUserInfoRequest {
    static instance(req: Request): UserInfoRequest {
        const { username, email } = req.body;

        if (!username || !email ) {
            throw new HandlerException('Faltan datos obligatorios para crear el usuario', 400);
        }
        return new UserInfoRequest(
            username,
            email,
        );
    }
}