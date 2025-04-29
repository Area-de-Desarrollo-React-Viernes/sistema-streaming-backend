import fs from 'fs';
import path from "path"
import { pool } from '../shared/infrastructure/database/database.config';

interface ServiceJson {
    name: string,
    price: number,
    description: string[]
}

export const serviceInsert = async () => {
    const filePath = path.join(__dirname, 'data/services.json');
    const rawData = fs.readFileSync(filePath, 'utf8');
    const data: ServiceJson[] = JSON.parse(rawData);

    const values = data.map((s) => [
            s.name,
            s.description.join('\n'),
            s.price
        ]);
    const query = 'INSERT INTO streaming_services (name, description, price) VALUES ?'
    await pool.query(query, [values]);
    console.log('Se inserto los servicios');
}