export class CreateUserRequest{
    constructor(
        public username: string,
        public email: string,
        public password: string,
    ){}
}