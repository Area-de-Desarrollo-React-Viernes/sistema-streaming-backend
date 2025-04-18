export class User{
    constructor(
        public username: string,
        public email: string,
        public password: string | null = null,
        public codeVerification: string | null = null,
        public timeExpired: string | null = null
    ){}
}