import { User } from "../entities/User";
import { UserImage } from "../entities/UserImage";
import { UserEmail } from "../entities/value-objects/UserEmail";
import { UserId } from "../entities/value-objects/UserId";

export interface ImageUserService {
    createImageUser(url: string | null, userId: number): Promise<void>
    updateImageUser(imageBase64: string, userId: UserId): Promise<void>;
    //findImageEmailUser(userEmail: UserEmail): Promise<UserImage>
}