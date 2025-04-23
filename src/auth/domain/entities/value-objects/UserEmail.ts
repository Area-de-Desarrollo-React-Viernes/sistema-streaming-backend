import { HandlerException } from "../../../../shared/domain/HandlerException";

export class UserEmail {
    constructor(
        public readonly value: string
    ) { 
        this.isEmail(value);
    }

    public isEmail(email: string): void {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            throw new HandlerException('No es un email', 400);
        }
    }
}