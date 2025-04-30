import fs from 'fs';
import path from "path"
import { pool } from '../shared/infrastructure/database/database.config';
import { randomInt } from 'crypto';
import { saveImageFromUrl } from '../shared/infrastructure/images/SaveImageUrl';

interface ContentJson {
    id: number,
    title: string,
    release_Date: string,
    exclusiveness: boolean,
    views: number,
    url_yotube: string,
    image_url: string,
    franchise_id: number,
    season_number: number
}
interface VideoJson {
    video_url: string 
}

export const ContentInsert = async () => {
    const filePath = path.join(__dirname, 'data/content.json');
    const rawData = await fs.readFileSync(filePath, 'utf8');
    const data: ContentJson[] = JSON.parse(rawData);


    const fileVideoPath = path.join(__dirname, 'data/content_donwload.json');
    const rawVideoData = await fs.readFileSync(fileVideoPath, 'utf8');
    const dataVideo: VideoJson[] = JSON.parse(rawVideoData);


    const formatDate = (date: string): string => {
        const [day, month, year] = date.split('/');
        return `${year}-${month}-${day}`;
    };

    const values = data.map((c, index) => {
        
        return [
        c.title,
        formatDate(c.release_Date),
        c.exclusiveness,
        randomInt(999999999),
        dataVideo[index].video_url,
        c.franchise_id
        ]
});

    const results = await Promise.allSettled(
        data.map(async (i) => [
            i.id,
            'contents',
            await saveImageFromUrl(i.image_url, 'contends')
        ])
    );

    const valueImage = results
        .filter((r) => r.status === 'fulfilled')
        .map((r) => (r as PromiseFulfilledResult<any>).value);

    const query = 'INSERT INTO audiovisual_contents (title, release_date, exclusiveness, views, url_youtube, franchise_id) VALUES ?';
    await pool.query(query, [values]);

    const queryImage = 'INSERT INTO images (imageble_id, imageble_type, url) VALUES ?';
    await pool.query(queryImage, [valueImage]);
    console.log('Se inserto el contenido');
}