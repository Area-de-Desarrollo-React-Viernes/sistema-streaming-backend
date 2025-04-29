import fs from 'fs';
import path from 'path';
import { pool } from '../shared/infrastructure/database/database.config';

interface GenerosJSON {
    id: number,
    name: string
}
export const generInsert = async () => {
    const filePath = path.join(__dirname, '/data/geners.json');
    const rawData = fs.readFileSync(filePath, 'utf8');
    const data: GenerosJSON[] = JSON.parse(rawData);

    const values: string[][] = data.map((g) => [g.name]);
    const query = 'INSERT INTO geners (name) VALUES ?';

    await pool.query(query, [values]);
}