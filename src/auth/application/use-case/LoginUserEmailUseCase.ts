import { UserEmail } from "../../domain/entities/value-objects/UserEmail";
import { UserPassword } from "../../domain/entities/value-objects/UserPassword";
import { AuthenticateRepository } from "../../domain/repository/AuthenticateRepository";
import { CredentialRequest } from "../dto/request/CredentialRequest";

export class LoginUserEmailUseCase {
    constructor(
        private authRepository: AuthenticateRepository
    ){}
    async run(req: CredentialRequest): Promise<string>{
        const token = await this.authRepository.loginUser(new UserEmail(req.email), new UserPassword(req.password));
        return token;
    }
}