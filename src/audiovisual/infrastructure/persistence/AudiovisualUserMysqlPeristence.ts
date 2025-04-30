import { RowDataPacket } from "mysql2";
import { pool } from "../../../shared/infrastructure/database/database.config";
import { AudiovisualContent } from "../../domain/entities/AudiovisualContent";
import { AudiovisualUserRepository } from "../../domain/repository/AudiovisualUserRepository";

export class AudiovisualUserMysqlPersistence implements AudiovisualUserRepository {
    async getPopularContent(): Promise<AudiovisualContent[]> {
        const [rows] = await pool.execute<RowDataPacket[]>(`
                SELECT 
                id,
                title,
                release_date,
                exclusiveness,
                views
                FROM audiovisual_contents
                ORDER BY views DESC
                LIMIT 10
            `);
        return rows.map(row => new AudiovisualContent(
            row.id,
            row.title,
            row.release_date?.toISOString?.().split('T')[0] || '',
            !!row.exclusiveness,
            row.views
        ));
    }
}