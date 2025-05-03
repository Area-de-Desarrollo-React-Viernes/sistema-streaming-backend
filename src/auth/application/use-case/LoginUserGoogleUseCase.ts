import { UserGoogleNotFound } from "../../domain/exceptions/UserGoogleNotFound";
import { AuthGoogleService } from "../../domain/service/AuthGoogleService";

export class LoginUserGoogleUseCase {
    constructor(
        private googleRepository: AuthGoogleService
    ) { }
    async run(token: string): Promise<string> {
        const user = await this.googleRepository.findUserGoogle(token);
        if (!user) {
            throw new UserGoogleNotFound;
        }
        const tokenJWT = await this.googleRepository.loginUserGoogle(user);
        return tokenJWT;
    }
}