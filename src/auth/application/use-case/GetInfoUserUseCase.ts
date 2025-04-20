import { UserId } from "../../domain/entities/value-objects/UserId";
import { UserNotFound } from "../../domain/exceptions/UserNotFound";
import { AuthenticateRepository } from "../../domain/repository/AuthenticateRepository";
import { ImageUserService } from "../../domain/service/ImageUserService";
import { UserResponse } from "../dto/response/UserResponse";

export class GetInfoUserUseCase {
    constructor(
        private authRepository: AuthenticateRepository,
        private imageRepositiry: ImageUserService
    ){}
    async run(userId: number): Promise<UserResponse> {
        const user = await this.authRepository.getById(new UserId(userId));
        if(!user){
            throw new UserNotFound;
        }
        const userImage = await this.imageRepositiry.findImageById(new UserId(user.id as number));
        return new UserResponse(
            user.username,
            user.email,
            {
                url: userImage?.url ?? null
            }
        );
    }
}