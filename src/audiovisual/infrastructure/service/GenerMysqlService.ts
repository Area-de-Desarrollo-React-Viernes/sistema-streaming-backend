import { RowDataPacket } from "mysql2";
import { pool } from "../../../shared/infrastructure/database/database.config";
import { Gener } from "../../domain/entities/Gener";
import { GenerService } from "../../domain/service/GenerService";

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
}