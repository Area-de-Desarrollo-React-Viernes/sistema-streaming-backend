import { RowDataPacket } from "mysql2";
import { pool } from "../../../shared/infrastructure/database/database.config";
import { Gener } from "../../domain/entities/Gener";
import { GenerService } from "../../domain/service/GenerService";
import { ContentId } from "../../domain/entities/ValueObjects/ContendId";

export class GenerMysqlService implements GenerService {
    async getGeners(): Promise<Gener[]> {
        const [rows] = await pool.execute<RowDataPacket[]>(`SELECT * FROM geners`);

        return rows.map((r) => {
            return new Gener(
                    r.id,
                    r.name
            );
        });
    }
    async getGenerByContent(contenId: ContentId): Promise<Gener | null> {
        const [row] = await pool.execute<RowDataPacket[]>(`
                SELECT 
                g.id,
                g.name
                FROM audiovisual_contents AS a
                INNER JOIN franchises AS f ON f.id = a.franchise_id
                INNER JOIN geners AS g ON g.id = f.gener_id
                WHERE a.id = ?
            `, [
                contenId.value
            ]);
        if(row.length === 0){
            return null;
        }
        const gener = row[0];
        return new Gener(
            gener.id,
            gener.name
        );
    }
}