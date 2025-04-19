import { UserCodeVerification } from "../../domain/entities/value-objects/UserCodeVerification";
import { UserEmail } from "../../domain/entities/value-objects/UserEmail";
import { UserPassword } from "../../domain/entities/value-objects/UserPassword";
import { AuthenticateRepository } from "../../domain/repository/AuthenticateRepository";
import { UpdatePasswordRequest } from "../dto/request/UpdatePasswordRequest";

export class ChangeVerifiedPassword {
    constructor(
        private authRepository: AuthenticateRepository
    ) { }
    async run(req: UpdatePasswordRequest): Promise<void> {
        await this.authRepository.updatePassword(
            new UserCodeVerification(req.code),
            new UserPassword(req.newPassword),
            new UserEmail(req.email)
        );
    }
}