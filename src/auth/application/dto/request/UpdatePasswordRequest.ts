export class UpdatePasswordRequest {
    constructor(
        public code: string,
        public newPassword: string,
        public email: string
    ){}
}