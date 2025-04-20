import { User } from "../entities/User";
import { UserCodeVerification } from "../entities/value-objects/UserCodeVerification";
import { UserEmail } from "../entities/value-objects/UserEmail";
import { UserId } from "../entities/value-objects/UserId";
import { UserPassword } from "../entities/value-objects/UserPassword";
import { UserUsername } from "../entities/value-objects/UserUsername";

export interface AuthenticateRepository {
    createUserRegisterEmail(user: User): Promise<User>;
    getByEmail(email: UserEmail): Promise<User | null>;
    getById(userId: UserId): Promise<User | null>;
    updateUsername(username: UserUsername, email: UserEmail): Promise<User>;
    updateCodeGenerate(codeVerification: UserCodeVerification, email: UserEmail): Promise<void>;
    loginUser(email: UserEmail, password: UserPassword): Promise<string>
    updatePassword(codeVerification: UserCodeVerification, newPassword: UserPassword, email: UserEmail): Promise<void>;
    // deleteUser(ecodeVerification: UserCodeVerification): Promise<User>;
}