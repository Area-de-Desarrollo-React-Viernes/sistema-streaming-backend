import fs from 'fs';
import path from "path";
import { pool } from '../shared/infrastructure/database/database.config';

interface FormatJson {
    id: number,
    name: string
};

export const formatInsert = async () => {
    const filePath = path.join(__dirname, '/data/format.json');
    const rawData = fs.readFileSync(filePath, 'utf8');
    const data: FormatJson[] = JSON.parse(rawData);

    const values: string[][] = data.map((f) => [f.name]);
    const query = 'INSERT INTO format_types (name) VALUES ?';

    await pool.query(query, [values]);
}