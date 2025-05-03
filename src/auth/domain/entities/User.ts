export class User{
    constructor(
        public id: number | null,
        public username: string,
        public email: string | null = null,
        public password: string | null = null,
        public codeVerification: string | null = null,
        public timeExpired: string | null = null
    ){}
}