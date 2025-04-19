import { User } from "../../domain/entities/User";
import { UserEmail } from "../../domain/entities/value-objects/UserEmail";
import { UserUsername } from "../../domain/entities/value-objects/UserUsername";
import { UserNotFound } from "../../domain/exceptions/UserNotFound";
import { AuthenticateRepository } from "../../domain/repository/AuthenticateRepository";
import { UserInfoRequest } from "../dto/request/UserInfoRequest";
import { UserInfoResponse } from "../dto/response/UserInfoResponse";

export class ChangeUsernameUseCase {
    constructor(
        private authRepository: AuthenticateRepository
    ) { }
    async run(req: UserInfoRequest): Promise<UserInfoResponse> {
        const userValidate = await this.authRepository.getByEmail(new UserEmail(req.email));
        if (!userValidate) {
            throw new UserNotFound;
        }
        const user = await this.authRepository.updateUsername(new UserUsername(req.username), new UserEmail(req.email));
        return new UserInfoResponse(
            user.username,
            user.email
        );
    }
}