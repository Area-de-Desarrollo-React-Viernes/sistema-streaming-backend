import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { CONFIG } from '../../config/config';
import https from 'https';
import http from 'http';
import { URL } from 'url';

export const saveImageFromUrl = (
    imageUrl: string,
    folder: string,
    filePrefix = 'img'
): Promise<string> => {
    return new Promise((resolve, reject) => {
        const url = new URL(imageUrl);
        const protocol = url.protocol === 'https:' ? https : http;

        protocol.get(imageUrl, (res) => {
            const contentType = res.headers['content-type'];
            if (!contentType || !contentType.startsWith('image/')) {
                return reject(new Error('URL no contiene una imagen válida'));
            }

            const extension = contentType.split('/')[1];
            const fileName = `${filePrefix}-${uuidv4()}.${extension}`;
            const uploadFolder = path.join(__dirname, '..', '../../uploads', folder);

            if (!fs.existsSync(uploadFolder)) {
                fs.mkdirSync(uploadFolder, { recursive: true });
            }

            const absolutePath = path.join(uploadFolder, fileName).replace(/\\/g, '/');
            const relativePath = path.join('uploads', folder, fileName).replace(/\\/g, '/');
            const publicUrl = `${CONFIG.app.url}${relativePath}`;

            const fileStream = fs.createWriteStream(absolutePath);
            res.pipe(fileStream);

            fileStream.on('finish', () => {
                fileStream.close();
                resolve(publicUrl);
            });

            fileStream.on('error', (err) => {
                reject(err);
            });

        }).on('error', (err) => {
            reject(err);
        });
    });
};