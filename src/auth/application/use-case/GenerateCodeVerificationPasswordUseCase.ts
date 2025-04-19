import { UserCodeVerification } from "../../domain/entities/value-objects/UserCodeVerification";
import { UserEmail } from "../../domain/entities/value-objects/UserEmail";
import { UserNotFound } from "../../domain/exceptions/UserNotFound";
import { AuthenticateRepository } from "../../domain/repository/AuthenticateRepository";
import { SendEmailService } from "../../domain/service/SendEmailService";

export class GenerateCodeVerificationPasswordUseCase {
    constructor(
        private userRepository: AuthenticateRepository,
        private emailRepository: SendEmailService
    ) { }

    async run(email: string): Promise<void> {
        
        const user = await this.userRepository.getByEmail(new UserEmail(email));
        if (!user) {
            throw new UserNotFound;
        }
        const codeGenerate = await this.emailRepository.sendCodeEmail(new UserEmail(email));
        await this.userRepository.updateCodeGenerate(
            new UserCodeVerification(codeGenerate),
            new UserEmail(email)
        );
    }
}