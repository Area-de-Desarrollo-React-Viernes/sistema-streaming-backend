import { UserEmail } from "../entities/value-objects/UserEmail";

export interface SendEmailService {
    sendCodeEmail(email: UserEmail): Promise<string>
}