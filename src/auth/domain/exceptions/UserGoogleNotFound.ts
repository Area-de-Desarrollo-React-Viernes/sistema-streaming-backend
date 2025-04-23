import { HandlerException } from "../../../shared/domain/HandlerException";

export class UserGoogleNotFound extends HandlerException{
    constructor() {
        super('Usuario de Google no encontrado', 404);
    }
}