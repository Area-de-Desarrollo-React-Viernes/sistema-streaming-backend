import fs from 'fs';
import path from "path"
import { pool } from '../shared/infrastructure/database/database.config';

interface StatusJson {
    name: string
}

export const statusInsert = async () => {
    const filePath = path.join(__dirname, 'data/status.json');
    const rawData = fs.readFileSync(filePath, 'utf8');
    const data: StatusJson[] = JSON.parse(rawData);

    const values = data.map((s) => [
        s.name
    ]);

    const query = 'INSERT INTO subscription_statuses (name) VALUES ?';
    await pool.query(query, [values]);
} 