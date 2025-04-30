import { RowDataPacket } from "mysql2";
import { pool } from "../../../shared/infrastructure/database/database.config";
import { AudiovisualContent } from "../../domain/entities/AudiovisualContent";
import { AudiovisualUserRepository } from "../../domain/repository/AudiovisualUserRepository";
import { AudiovisualVideo } from "../../domain/entities/AudivisualVideo";

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
    async getHeroRandomVideo(): Promise<AudiovisualVideo[]> {
        const [rows] = await pool.execute<RowDataPacket[]>(`
                SELECT
                    c.id,
                    c.title,
                    c.release_date,
                    c.url_youtube,
                    f.description
                FROM(
                    SELECT *, RAND() as rand_val
                    FROM audiovisual_contents
                    ORDER BY views DESC
                    LIMIT 10
                ) AS c
                INNER JOIN franchises AS f ON f.id = c.franchise_id
                ORDER BY RAND() 
                LIMIT 10
            `);
        return rows.map(row => new AudiovisualVideo(
            row.id,
            row.title,
            row.release_date?.toISOString?.().split('T')[0] || '',
            row.url_youtube,
            row.description
        ));
    }
}