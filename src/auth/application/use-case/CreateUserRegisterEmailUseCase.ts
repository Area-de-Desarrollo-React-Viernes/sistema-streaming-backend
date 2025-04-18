import { User } from "../../domain/entities/User";
import { UserEmail } from "../../domain/entities/value-objects/UserEmail";
import { UserExists } from "../../domain/exceptions/UserExists";
import { AuthenticateRepository } from "../../domain/repository/AuthenticateRepository";
import { CreateUserRequest } from "../dto/request/CreateUserRequest";
import { UserInfoResponse } from "../dto/response/UserInfoResponse";

export class createUserRegisterEmailUseCase {
    constructor(
        private authRepository: AuthenticateRepository
    ) { }

    async run(req: CreateUserRequest): Promise<UserInfoResponse> {

        const user = await this.authRepository.getByEmail(new UserEmail(req.email));
        if (user) {
            throw new UserExists;
        }

        const userCreate = await this.authRepository.createUserRegisterEmail(new User(
            req.username,
            req.email,
            req.password
        ));
        return new UserInfoResponse(
            userCreate.username,
            userCreate.email
        );
    }
}