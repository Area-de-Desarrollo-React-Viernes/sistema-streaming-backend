export class CreateUserDTO{
    constructor(
        public username: string,
        public email: string,
        public password: string,
    ){}
}