export class UserGoogle {
    constructor(
        public username: string,
        public email: string,
        public providerId: string,
        public emailVerified: boolean,
        public loginType: string,
        public image: string
    ){}
}