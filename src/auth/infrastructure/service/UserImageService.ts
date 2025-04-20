import { pool } from "../../../shared/infrastructure/database/database.config";
import { saveBase64Image } from "../../../shared/infrastructure/images/SaveImageBase64";
import { User } from "../../domain/entities/User";
import { UserImage } from "../../domain/entities/UserImage";
import { UserId } from "../../domain/entities/value-objects/UserId";
import { ImageUserService } from "../../domain/service/ImageUserService";

export class UserImageService implements ImageUserService {
    async createImageUser(url: string | null, userId: number): Promise<void> {
        await pool.execute('INSERT INTO images (imageble_id, imageble_type, url) VALUES(?, ?, ?)', [
            userId, 'users', url
        ]);
    }
    async updateImageUser(imageBase64: string, userId: UserId): Promise<void> {
        const imageUrl = saveBase64Image(imageBase64, 'users', 'user');
        await pool.execute('UPDATE images SET url = ? WHERE imageble_id = ? AND imageble_type = ?', [
            imageUrl, userId.value, 'users'
        ]);
    }
}