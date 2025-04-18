export class UserPassword{
    constructor(
        public readonly password: string
    ){}

    public typePassword(password: string): void
    {
        if(typeof password === 'string'){
            throw new Error('No es de tipo string');
        }
    }
}