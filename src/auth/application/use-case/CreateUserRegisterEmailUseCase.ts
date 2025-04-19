import { User } from "../../domain/entities/User";
import { UserEmail } from "../../domain/entities/value-objects/UserEmail";
import { UserExists } from "../../domain/exceptions/UserExists";
import { AuthenticateRepository } from "../../domain/repository/AuthenticateRepository";
import { ImageUserService } from "../../domain/service/ImageUserService";
import { CreateUserRequest } from "../dto/request/CreateUserRequest";
import { UserInfoResponse } from "../dto/response/UserInfoResponse";

export class CreateUserRegisterEmailUseCase {
    constructor(
        private authRepository: AuthenticateRepository,
        private imageRepository: ImageUserService
    ) { }

    async run(req: CreateUserRequest): Promise<UserInfoResponse> {

        const user = await this.authRepository.getByEmail(new UserEmail(req.email));
        if (user) {
            throw new UserExists;
        }
        const userCreate = await this.authRepository.createUserRegisterEmail(new User(
            null,
            req.username,
            req.email,
            req.password
        ));
        await this.imageRepository.createImageUser(null, userCreate.id as number);
        return new UserInfoResponse(
            userCreate.username,
            userCreate.email
        );
    }
}