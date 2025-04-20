import { URL } from "node:url";
import { supabase } from "../supabase/SupabaseClient";

export const deleteImageUrlSupabase = async (urlImage: string,) => {
    const publicPathPrefix = '/storage/v1/object/public/';
    const url = new URL(urlImage);
    const fullPath = url.pathname;

    const pathIndex = fullPath.indexOf(publicPathPrefix);
    if (pathIndex === -1) throw new Error('URL inválida');

    const relativePath = fullPath.substring(pathIndex + publicPathPrefix.length);
    const [bucketName, ...filePathParts] = relativePath.split('/');
    const filePath = filePathParts.join('/');

    const { error } = await supabase.storage
        .from(bucketName)
        .remove([filePath]);

    if (error) throw error;

    console.log(`Archivo ${filePath} eliminado con éxito del bucket ${bucketName}`);
    return { success: true, message: 'Archivo eliminado con éxito' };
};