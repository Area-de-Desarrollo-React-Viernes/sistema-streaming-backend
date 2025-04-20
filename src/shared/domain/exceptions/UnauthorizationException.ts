import { HandlerException } from "../HandlerException";

export class UnauthoeizationException extends HandlerException {
    constructor() {
        super('Inautorizado', 500);
    }
}