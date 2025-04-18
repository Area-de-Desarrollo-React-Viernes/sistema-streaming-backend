export class UserUsername {
    constructor(
        public readonly value: string
    ) {
        this.typeUsername(value);
    }
    public typeUsername(username: string): void {
        if (typeof username === 'string') {
            throw new Error('No es de tipo string');
        }
    }
}