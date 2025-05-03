import { HandlerException } from "../../../shared/domain/HandlerException";

export class RegistersNotFound extends HandlerException {
    constructor() {
        super('No hay registros en esta pagina', 404);
    }
}