import { RowDataPacket } from "mysql2";
import { pool } from "../../../shared/infrastructure/database/database.config";
import { Franchise } from "../../domain/entities/Franchise";
import { FranchiseId } from "../../domain/entities/ValueObjects/FranchiseId";
import { FranchiseService } from "../../domain/service/FranchiseService";

export class FranchiseMysqlService implements FranchiseService {
    async getFranchise(id: FranchiseId): Promise<Franchise> {
        const [rows] = await pool.execute<RowDataPacket[]>(`
                SELECT 
                id,
                title,
                description,
                gener_id
                FROM 
                franchises
                WHERE id = ?
            `, [id.value]);
        const franchise = rows[0];
        return new Franchise(
            franchise.id,
            franchise.title,
            franchise.description,
            franchise.gener_id
        );
    }
}