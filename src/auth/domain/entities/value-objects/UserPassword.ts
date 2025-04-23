export class UserPassword{
    constructor(
        public readonly value: string
    ){}

    public typePassword(password: string): void
    {
        if(typeof password !== 'string'){
            throw new Error('El password no es de tipo string');
        }
    }
}