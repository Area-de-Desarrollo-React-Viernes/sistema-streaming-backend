import { RowDataPacket } from "mysql2";
import { pool } from "../../../shared/infrastructure/database/database.config";
import { Image } from "../../domain/entities/Image";
import { ImageContentService } from "../../domain/service/ImageContentService";
import { url } from "node:inspector";

export class ImageContentMysqlService implements ImageContentService {
    async getPopularContentImage(contentIds: number[]): Promise<Image[]> {
        const placeholders = contentIds.map(() => '?').join(', ');
        const [rows] = await pool.execute<RowDataPacket[]>(
            `
        SELECT imageble_id, url
        FROM images
        WHERE imageble_id IN (${placeholders})
        AND imageble_type = 'contents'
        ORDER BY imageble_id DESC
        `,
            contentIds
        );
        return rows.map((row) => {
            return new Image(
                row.imageble_id,
                row.url
            );
        });
    }
}
