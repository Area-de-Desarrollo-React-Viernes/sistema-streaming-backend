export class UserCodeVerification{
    constructor(
        public readonly value: string
    ){
        this.validateLegnth(this.value);
    }
    public validateLegnth(codeVerification: string): void
    {       
        const validateLegnth = codeVerification.length <= 6
        if(!validateLegnth){
            throw new Error('No debe sobrepasar 6 digitos');
        }
    }
}
