import { RowDataPacket } from "mysql2";
import { pool } from "../../../shared/infrastructure/database/database.config";
import { AudiovisualContent } from "../../domain/entities/AudiovisualContent";
import { AudiovisualUserRepository } from "../../domain/repository/AudiovisualUserRepository";
import { AudiovisualVideo } from "../../domain/entities/AudivisualVideo";
import { ContentId } from "../../domain/entities/ValueObjects/ContendId";
import { FranchiseId } from "../../domain/entities/ValueObjects/FranchiseId";

export class AudiovisualUserMysqlPersistence implements AudiovisualUserRepository {
    async getPopularContent(): Promise<AudiovisualContent[]> {
        const [rows] = await pool.execute<RowDataPacket[]>(`
                SELECT 
                id,
                title,
                release_date,
                exclusiveness,
                views,
                franchise_id
                FROM audiovisual_contents
                ORDER BY views DESC
                LIMIT 10
            `);
        return rows.map(row => new AudiovisualContent(
            row.id,
            row.title,
            row.release_date?.toISOString?.().split('T')[0] || '',
            !!row.exclusiveness,
            row.views,
            null,
            row.franchise_id
        ));
    }
    async getHeroRandomVideo(): Promise<AudiovisualVideo[]> {
        const [rows] = await pool.execute<RowDataPacket[]>(`
                SELECT
                    c.id,
                    c.title,
                    c.release_date,
                    c.url_youtube,
                    c.franchise_id,
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
            row.description,
            row.franchise_id
        ));
    }
    async getContentsFilter(gener: string | null, format: string | null, limit: number, page: number): Promise<{
        data: AudiovisualContent[];
        total: number;
        nextPage: number | null;
        prevPage: number | null;
        totalPage: number;
    }> {
        const offset = (page - 1) * limit;
        let query = `
            SELECT SQL_CALC_FOUND_ROWS
            c.id,
            c.title,
            c.release_date,
            c.exclusiveness,
            c.views,
            c.franchise_id
            FROM audiovisual_contents AS c
            INNER JOIN franchises AS f ON f.id = c.franchise_id
            INNER JOIN format_types AS ft ON ft.id = f.format_type_id
            INNER JOIN geners AS g ON g.id = f.gener_id
            WHERE 1=1
        `;

        const params = [];
        if (gener) {
            query += ' AND g.name = ?';
            params.push(gener);
        }

        if (format) {
            query += ' AND ft.name = ?';
            params.push(format);
        }

        query += ' ORDER BY c.release_date DESC LIMIT ?, ?';
        params.push(offset, limit);

        const [contents] = await pool.execute<RowDataPacket[]>(query, params);
        const [[total]] = await pool.execute<RowDataPacket[]>('SELECT FOUND_ROWS() as total');

        const totalCount = total.total;
        const totalPage = Math.ceil(totalCount / limit);

        return {
            data: contents.map((c) => {
                return new AudiovisualContent(
                    c.id,
                    c.title,
                    c.release_date?.toISOString?.().split('T')[0] || '',
                    c.exclusiveness,
                    c.views,
                    null,
                    c.franchise_id
                );
            }),
            total: totalCount,
            nextPage: page < totalPage ? page + 1 : null,
            prevPage: page > 1 ? page - 1 : null,
            totalPage: totalPage
        }
    }
    async getContentId(id: ContentId): Promise<AudiovisualContent | null> {
        const [row] = await pool.execute<RowDataPacket[]>(`
                SELECT 
                a.id,
                a.title,
                a.release_date,
                a.exclusiveness,
                a.views,
                a.url_youtube,
                a.franchise_id
                FROM audiovisual_contents AS a
                WHERE a.id = ?
            `, [id.value]);
        if (row.length === 0) {
            return null;
        }
        const content = row[0];
        return new AudiovisualContent(
            content.id,
            content.title,
            content.release_date?.toISOString?.().split('T')[0] || '',
            content.exclusiveness,
            content.views,
            content.url_youtube,
            content.franchise_id
        );
    }
    async getContentFranchiseId(franchiseId: FranchiseId): Promise<AudiovisualContent[]> {
        const [rows] = await pool.execute<RowDataPacket[]>(`
                SELECT
                *
                FROM
                audiovisual_contents 
                WHERE franchise_id = ?
            `, [franchiseId.value]);
        return rows.map((content) => {
            return new AudiovisualContent(
                content.id,
                content.title,
                content.release_date?.toISOString?.().split('T')[0] || '',
                content.exclusiveness,
                content.views,
                content.url_youtube,
                content.franchise_id
            );
        });
    }
}