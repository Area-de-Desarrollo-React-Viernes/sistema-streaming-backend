import { User } from "../entities/User";
import { UserCodeVerification } from "../entities/value-objects/UserCodeVerification";
import { UserEmail } from "../entities/value-objects/UserEmail";
import { UserPassword } from "../entities/value-objects/UserPassword";
import { UserUsername } from "../entities/value-objects/UserUsername";

export interface AuthenticateRepository {
    createUserRegisterEmail(user: User): Promise<User>;
    getByEmail(email: UserEmail): Promise<User | null>;
    updateUsername(username: UserUsername, email: UserEmail): Promise<User>;
    //updatePassword(codeVerification: UserCodeVerification, password: UserPassword): Promise<User>;
    // deleteUser(ecodeVerification: UserCodeVerification): Promise<User>;
}