import { RowDataPacket } from "mysql2";
import { pool } from "../../../shared/infrastructure/database/database.config";
import { Format } from "../../domain/entities/Format";
import { FormatService } from "../../domain/service/FormatService";

export class FormatMysqlService implements FormatService {
    async getFormats(): Promise<Format[]> {
        const [rows] = await pool.execute<RowDataPacket[]>(`SELECT * FROM format_types`);

        return rows.map((r) => {
            return new Format(
                    r.id,
                    r.name
            );
        });
    }
} 