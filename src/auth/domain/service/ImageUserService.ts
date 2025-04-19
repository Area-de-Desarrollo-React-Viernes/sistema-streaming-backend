import { User } from "../entities/User";
import { UserImage } from "../entities/UserImage";
import { UserEmail } from "../entities/value-objects/UserEmail";

export interface ImageUserService {
    createImageUser(url: string | null, userId: number): Promise<void>
    //updateImageUser(url: string): Promise<UserImage>;
    //findImageEmailUser(userEmail: UserEmail): Promise<UserImage>
}