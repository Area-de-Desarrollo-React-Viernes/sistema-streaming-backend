import { v4 as uuidv4 } from 'uuid';
import { supabase } from '../supabase/SupabaseClient';

export const saveImageBase64Supabase = async (base64Image: string, bucketName = 'images') => {
    const matches = base64Image.match(/^data:(.+);base64,(.+)$/);
    if (!matches) throw new Error('Formato base64 inválido');

    const contentType = matches[1];
    const buffer = Buffer.from(matches[2], 'base64');
    const fileExt = contentType.split('/')[1];
    const fileName = `${uuidv4()}.${fileExt}`;

    const { data, error } = await supabase.storage
        .from(`spectra/${bucketName}`)
        .upload(fileName, buffer, {
            contentType,
            upsert: false
        });

    if (error) throw error;

    const { data: publicUrlData } = supabase.storage
        .from(`spectra/${bucketName}`)
        .getPublicUrl(fileName);

    return {
        path: data?.path,
        url: publicUrlData?.publicUrl
    };
}