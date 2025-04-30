import { RowDataPacket } from "mysql2";
import { pool } from "../../../shared/infrastructure/database/database.config";
import { saveBase64Image } from "../../../shared/infrastructure/images/SaveImageBase64";
import { Image } from "../../domain/entities/Image";
import { UserId } from "../../domain/entities/value-objects/UserId";
import { ImageUserService } from "../../domain/service/ImageUserService";
import { saveImageBase64Supabase } from "../../../shared/infrastructure/images/SaveImageBase64Supabase";

export class UserImageService implements ImageUserService {
    async createImageUser(url: string | null, userId: number): Promise<void> {
        await pool.execute('INSERT INTO images (imageble_id, imageble_type, url) VALUES(?, ?, ?)', [
            userId, 'users', url
        ]);
    }
    async updateImageUser(imageBase64: string, userId: UserId): Promise<void> {
        const imageUrl = await saveImageBase64Supabase(imageBase64, 'users');
        await pool.execute('UPDATE images SET url = ? WHERE imageble_id = ? AND imageble_type = ?', [
            imageUrl.url, userId.value, 'users'
        ]);
    }
    async findImageById(userId: UserId): Promise<Image | null> {
        const [rows] = await pool.execute<RowDataPacket[]>('SELECT url FROM images WHERE imageble_type = ? AND imageble_id = ? ', [
            'users', userId.value
        ]);
        if(rows.length === 0){
            return null;
        }
        const image = rows[0];
        return new Image(image.url);
    }
}