export class UserId {
    constructor(
        public value: number
    ) {
        this.typeId(value);
    }

    public typeId(id: number): void
    {
        if(typeof id !== 'number'){
            throw new Error('El id no es de tipo number');
        }
    }
}