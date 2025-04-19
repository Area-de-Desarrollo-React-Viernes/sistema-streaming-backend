import { HandlerException } from "../../../shared/domain/HandlerException";

export class UserExists extends HandlerException {
    constructor() {
        super('Este usuario existe', 401);

    }

}