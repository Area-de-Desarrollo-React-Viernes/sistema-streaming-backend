import { HandlerException } from "../../../shared/domain/HandlerException";

export class UserNotFound extends HandlerException {
    constructor() {
        super('Usuario no encontrado', 404);
    }
}