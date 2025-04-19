import { pool } from "../../../shared/infrastructure/database/database.config";
import { User } from "../../domain/entities/User";
import { UserImage } from "../../domain/entities/UserImage";
import { ImageUserService } from "../../domain/service/ImageUserService";

export class UserImageService implements ImageUserService {
    async createImageUser(url: string | null, userId: number): Promise<void> {
        await pool.execute('INSERT INTO images (imageble_id, imageble_type, url) VALUES(?, ?, ?)', [
            userId, 'users', url
        ]);
    }
}