import { RowDataPacket } from "mysql2";
import { pool } from "../../../shared/infrastructure/database/database.config";
import { Image } from "../../domain/entities/Image";
import { ImageContentService } from "../../domain/service/ImageContentService";

export class ImageContentMysqlService implements ImageContentService {
    async getPopularContentImage(): Promise<Image[]> {
        const [rows] = await pool.execute<RowDataPacket[]>(`
            SELECT 
            i.url
            FROM audiovisual_contents AS c
            INNER JOIN images as i ON i.imageble_id = c.id AND i.imageble_type = 'contents'
            ORDER BY c.views DESC
            LIMIT 10;
        `);
        return (rows as Image[]);
    }
}
