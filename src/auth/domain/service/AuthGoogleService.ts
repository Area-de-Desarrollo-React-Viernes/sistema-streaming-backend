import { User } from "../entities/User";
import { UserGoogle } from "../entities/UserGoogle";

export interface AuthGoogleService {
    findUserGoogle(token: string): Promise<UserGoogle | null>
    createUserGoogle(token: string): Promise<string>
    loginUserGoogle(token: string): Promise<string>
}