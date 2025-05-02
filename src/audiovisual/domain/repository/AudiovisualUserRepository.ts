import { AudiovisualContent } from "../entities/AudiovisualContent";
import { AudiovisualVideo } from "../entities/AudivisualVideo";


export interface AudiovisualUserRepository {
    getPopularContent(): Promise<AudiovisualContent[]>;
    getHeroRandomVideo(): Promise<AudiovisualVideo[]>;
    getContentsFilter(gener: string | null, format: string | null, limit: number, page: number): Promise<{
        data: AudiovisualContent[],
        total: number,
        nextPage: number | null,
        prevPage: number | null,
        totalPage: number
    }>;
}