import { UserEmail } from "../../domain/entities/value-objects/UserEmail";
import { UserId } from "../../domain/entities/value-objects/UserId";
import { UserUsername } from "../../domain/entities/value-objects/UserUsername";
import { UserNotFound } from "../../domain/exceptions/UserNotFound";
import { AuthenticateRepository } from "../../domain/repository/AuthenticateRepository";
import { UserInfoResponse } from "../dto/response/UserInfoResponse";

export class ChangeUsernameUseCase {
    constructor(
        private authRepository: AuthenticateRepository
    ) { }
    async run(username: string, userId: number): Promise<UserInfoResponse> {
        const userValidate = await this.authRepository.getById(new UserId(userId));
        if (!userValidate) {
            throw new UserNotFound;
        }
        const user = await this.authRepository.updateUsername(new UserUsername(username), new UserId(userId));
        return new UserInfoResponse(
            user.username,
        );
    }
}