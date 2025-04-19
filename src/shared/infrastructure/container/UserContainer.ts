import { ChangeUsernameUseCase } from "../../../auth/application/use-case/ChangeUsernameUseCase";
import { CreateUserRegisterEmailUseCase } from "../../../auth/application/use-case/CreateUserRegisterEmailUseCase";
import { GenerateCodeVerificationPasswordUseCase } from "../../../auth/application/use-case/GenerateCodeVerificationPasswordUseCase";
import { LoginUserEmailUseCase } from "../../../auth/application/use-case/LoginUserEmailUseCase";
import { UserMysqlPersistence } from "../../../auth/infrastructure/persistence/UserMysqlPersistence"
import { UserSendEmailService } from "../../../auth/infrastructure/service/UserSendEmailService";
import { ChangeVerifiedPassword } from "../../../auth/application/use-case/ChangeVerifiedPassword";
import { CreateUserGoogleUseCase } from "../../../auth/application/use-case/CreateUserGoogleUseCase";
import { UserAuthGoogleService } from "../../../auth/infrastructure/service/UserAuthGoogleServie";

const authRepository = new UserMysqlPersistence();
const emailRepository = new UserSendEmailService();
const googleRepository = new UserAuthGoogleService();

export const UserContainer = {
    createUserEmail: new CreateUserRegisterEmailUseCase(authRepository),
    sendCodeVerificationEmail: new GenerateCodeVerificationPasswordUseCase(authRepository, emailRepository),
    changeUsername: new ChangeUsernameUseCase(authRepository),
    loginEmail: new LoginUserEmailUseCase(authRepository),
    changePassword: new ChangeVerifiedPassword(authRepository),
    createUserGoogle: new CreateUserGoogleUseCase(googleRepository)
}