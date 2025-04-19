import { User } from "../entities/User";

export interface AuthGoogleService {
    createUserGoogle(token: string): Promise<string>
}