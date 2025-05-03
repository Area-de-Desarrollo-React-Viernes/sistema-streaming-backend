import { UserId } from "../../domain/entities/value-objects/UserId";
import { AuthenticateRepository } from "../../domain/repository/AuthenticateRepository";
import { ImageUserService } from "../../domain/service/ImageUserService";

export class UpdateImageUser {
    constructor(
        private imageRepository: ImageUserService
    ) {}
    async run(imageBase64: string, userId: number): Promise<void> {
        await this.imageRepository.updateImageUser(imageBase64, new UserId(userId));
    }
}