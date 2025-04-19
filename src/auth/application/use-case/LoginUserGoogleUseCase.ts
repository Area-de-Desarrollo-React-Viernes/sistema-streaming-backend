import { AuthGoogleService } from "../../domain/service/AuthGoogleService";

export class LoginUserGoogleUseCase {
    constructor(
        private googleRepository: AuthGoogleService
    ){}
    async run(token: string): Promise<string> {
        const tokenJWT = this.googleRepository.loginUserGoogle(token);
        return tokenJWT;
    }
}