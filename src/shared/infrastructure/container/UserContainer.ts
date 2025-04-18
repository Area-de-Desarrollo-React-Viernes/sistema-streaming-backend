import { createUserRegisterEmailUseCase } from "../../../auth/application/use-case/CreateUserRegisterEmailUseCase";
import { UserMysqlPersistence } from "../../../auth/infrastructure/persistence/UserMysqlPersistence"

const authRepository = new UserMysqlPersistence();
export const UserContainer = {
    createUserEmail: new createUserRegisterEmailUseCase(authRepository),
}