import { ChangeUsernameUseCase } from "../../../auth/application/use-case/ChangeUsernameUseCase";
import { CreateUserRegisterEmailUseCase } from "../../../auth/application/use-case/CreateUserRegisterEmailUseCase";
import { GenerateCodeVerificationPasswordUseCase } from "../../../auth/application/use-case/GenerateCodeVerificationPasswordUseCase";
import { LoginUserEmailUseCase } from "../../../auth/application/use-case/LoginUserEmailUseCase";
import { UserMysqlPersistence } from "../../../auth/infrastructure/persistence/UserMysqlPersistence"
import { UserSendEmailService } from "../../../auth/infrastructure/service/UserSendEmailService";
import { ChangeVerifiedPassword } from "../../../auth/application/use-case/ChangeVerifiedPassword";
import { CreateUserGoogleUseCase } from "../../../auth/application/use-case/CreateUserGoogleUseCase";
import { UserAuthGoogleService } from "../../../auth/infrastructure/service/UserAuthGoogleServie";
import { LoginUserGoogleUseCase } from "../../../auth/application/use-case/LoginUserGoogleUseCase";
import { UserImageService } from "../../../auth/infrastructure/service/UserImageService";
import { UpdateImageUser } from "../../../auth/application/use-case/UpdateImageUser";

const authRepository = new UserMysqlPersistence();
const emailRepository = new UserSendEmailService();
const googleRepository = new UserAuthGoogleService();
const imageRepository = new UserImageService();

export const UserContainer = {
    createUserEmail: new CreateUserRegisterEmailUseCase(authRepository, imageRepository),
    sendCodeVerificationEmail: new GenerateCodeVerificationPasswordUseCase(authRepository, emailRepository),
    changeUsername: new ChangeUsernameUseCase(authRepository),
    loginEmail: new LoginUserEmailUseCase(authRepository),
    changePassword: new ChangeVerifiedPassword(authRepository),
    createUserGoogle: new CreateUserGoogleUseCase(authRepository, googleRepository, imageRepository),
    loginUserGoogle: new LoginUserGoogleUseCase(googleRepository),
    updateUserImage: new UpdateImageUser(imageRepository)
}