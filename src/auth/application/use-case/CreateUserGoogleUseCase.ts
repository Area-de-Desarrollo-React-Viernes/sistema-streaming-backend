import { AuthGoogleService } from "../../domain/service/AuthGoogleService";

export class CreateUserGoogleUseCase {
    constructor(
        private googleRepository: AuthGoogleService
    ){}
    async run(token: string): Promise<string> {
        const tokenJWT = await this.googleRepository.createUserGoogle(token);
        return tokenJWT;
    }
}