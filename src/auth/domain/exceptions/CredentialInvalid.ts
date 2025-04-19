import { HandlerException } from "../../../shared/domain/HandlerException";

export class CredentialInvalid extends HandlerException {
    constructor(){
        super('Credenciales invalidas', 404)
    }
}