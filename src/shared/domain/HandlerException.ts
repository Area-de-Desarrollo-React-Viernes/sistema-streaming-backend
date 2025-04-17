export class HandlerException extends Error{
    constructor(
        public message: string,
        public errorCode: number
    ){
        super(message);
    }
}