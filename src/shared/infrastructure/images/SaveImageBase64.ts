import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { CONFIG } from '../../config/config';

export const saveBase64Image = (
    base64: string,
    folder: string,
    filePrefix = 'img'
    ):string => {
    const matches = base64.match(/^data:(.+);base64,(.+)$/);
    if (!matches) throw new Error('Formato base64 inválido');

    const mimeType = matches[1];
    const base64Data = matches[2];
    const extension = mimeType.split('/')[1];

    const fileName = `${filePrefix}-${uuidv4()}.${extension}`;

    const uploadFolder = path.join(__dirname, '..', '../../uploads', folder);
    if (!fs.existsSync(uploadFolder)) {
        fs.mkdirSync(uploadFolder, { recursive: true });
    }
    const domain = CONFIG.app.url as string;
    const absolutePath = path.join(uploadFolder, fileName).replace(/\\/g, '/');;
    const relativePath = path.join('uploads', folder, fileName).replace(/\\/g, '/');;
    const publicUrl = `${domain}${relativePath}`;
    fs.writeFileSync(absolutePath, Buffer.from(base64Data, 'base64'));

    return publicUrl;
};