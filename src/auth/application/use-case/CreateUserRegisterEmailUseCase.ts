import { User } from "../../domain/entities/User";
import { AuthenticateRepository } from "../../domain/repository/AuthenticateRepository";
import { CreateUserDTO } from "../dto/request/CreateUserDTO";
import { UserInfoResponse } from "../dto/response/UserInfoResponse";

export class createUserRegisterEmailUseCase {
    constructor(
        private authRepository: AuthenticateRepository
    ) { }

    async run(req: CreateUserDTO): Promise<UserInfoResponse> {
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