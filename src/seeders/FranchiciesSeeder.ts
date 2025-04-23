import fs from 'fs';
import path from "path";
import { pool } from '../shared/infrastructure/database/database.config';
import { ResultSetHeader } from 'mysql2';
import { saveImageFromUrl } from '../shared/infrastructure/images/SaveImageUrl';

interface FranchiciesJson {
    id: number,
    title: string,
    description: string,
    url: string,
    gener_id: number,
    user_id: number,
    format_type_id: number
}

export const franchiciesInsert = async () => {
    const filePath = path.join(__dirname, '/data/franchises.json');
    const rawData = fs.readFileSync(filePath, 'utf8');
    const data: FranchiciesJson[] = JSON.parse(rawData);
    const values = data.map((f) => [
        f.title,
        f.description,
        f.user_id,
        f.format_type_id,
        f.gener_id
    ]);
    const valueImage = await Promise.all(
        data.map(async (i) => [
        i.id, 
        'franchicies', 
        await saveImageFromUrl(i.url, 'franchise', 'fran')
    ]));

    const query = 'INSERT INTO franchises (title, description, user_id, format_type_id, gener_id) VALUES ?';
    await pool.query<ResultSetHeader>(query, [values]);
    
    const queryImage = 'INSERT INTO images (imageble_id, imageble_type, url) VALUES ?';
    await pool.query(queryImage, [valueImage]);
    console.log('Se registraron correctamente las franquicias')
}