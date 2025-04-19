import { User } from "../entities/User";
import { UserGoogle } from "../entities/UserGoogle";

export interface AuthGoogleService {
    findUserGoogle(token: string): Promise<UserGoogle | null>
    createUserGoogle(user: UserGoogle): Promise<string>
    loginUserGoogle(user: UserGoogle): Promise<string>
}