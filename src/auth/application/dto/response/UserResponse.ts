export class UserResponse {
    constructor(
        public readonly username: string,
        public readonly email: string,
        public readonly image: {
            url: string | null
        }
    ) { }
}