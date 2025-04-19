import { AuthGoogleService } from "../../domain/service/AuthGoogleService";
import { UserAuthGoogleService } from "../../infrastructure/service/UserAuthGoogleServie";

export class CreateUserGoogleUseCase {
    constructor(
        private googleRepository: AuthGoogleService
    ) { }
    async run(token: string): Promise<string> {
        const user = await this.googleRepository.findUserGoogle(token);
        if (!user) {
            throw new UserAuthGoogleService;
        }
        const tokenJWT = await this.googleRepository.createUserGoogle(user);
        return tokenJWT;
    }
}