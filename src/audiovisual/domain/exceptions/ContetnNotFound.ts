import { HandlerException } from "../../../shared/domain/HandlerException";

export class ContetnNotFound extends HandlerException {
    constructor() {
        super('Contenido no encontrado', 404);
    }
}