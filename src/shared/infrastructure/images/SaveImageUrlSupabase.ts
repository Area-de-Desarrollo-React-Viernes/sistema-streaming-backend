import { v4 as uuidv4 } from 'uuid';
import { supabase } from '../supabase/SupabaseClient';

export const saveImageFromUrlSupabase = async (imageUrl: string, bucketName = 'images') => {
    const response = await fetch(imageUrl);
    if (!response.ok) throw new Error('No se pudo obtener la imagen desde la URL');

    const contentType = response.headers.get('content-type');
    if (!contentType?.startsWith('image/')) throw new Error('La URL no contiene una imagen válida');

    const buffer = await response.arrayBuffer();
    const fileExt = contentType.split('/')[1];
    const fileName = `${uuidv4()}.${fileExt}`;

    const { data, error } = await supabase.storage
        .from(`spectra/${bucketName}`)
        .upload(fileName, Buffer.from(buffer), {
            contentType,
            upsert: false,
        });

    if (error) throw error;

    const { data: publicUrlData } = supabase.storage
        .from(`spectra/${bucketName}`)
        .getPublicUrl(fileName);

    return  publicUrlData?.publicUrl
};
