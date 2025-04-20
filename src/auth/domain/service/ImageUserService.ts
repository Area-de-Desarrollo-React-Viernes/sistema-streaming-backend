import { Image } from "../entities/Image";
import { UserId } from "../entities/value-objects/UserId";

export interface ImageUserService {
    createImageUser(url: string | null, userId: number): Promise<void>
    updateImageUser(imageBase64: string, userId: UserId): Promise<void>;
    findImageById(userId: UserId): Promise<Image | null>
}