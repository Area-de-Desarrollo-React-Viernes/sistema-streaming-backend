import { UserEmail } from "../../domain/entities/value-objects/UserEmail";
import { UserGoogleNotFound } from "../../domain/exceptions/UserGoogleNotFound";
import { UserNotFound } from "../../domain/exceptions/UserNotFound";
import { AuthenticateRepository } from "../../domain/repository/AuthenticateRepository";
import { AuthGoogleService } from "../../domain/service/AuthGoogleService";
import { ImageUserService } from "../../domain/service/ImageUserService";

export class CreateUserGoogleUseCase {
    constructor(
        private authRepository: AuthenticateRepository,
        private googleRepository: AuthGoogleService,
        private imageRepository: ImageUserService
    ) { }
    async run(token: string): Promise<string> {
        const user = await this.googleRepository.findUserGoogle(token);
        if (!user) {
            throw new UserGoogleNotFound;
        }
        const tokenJWT = await this.googleRepository.createUserGoogle(user);
        const userId = await this.authRepository.getByEmail(new UserEmail(user.email));
        if (!userId) {
            throw new UserNotFound;
        }
        await this.imageRepository.createImageUser(user.image, userId.id as number);
        return tokenJWT;
    }
}