import { AudiovisualContent } from "../entities/AudiovisualContent";
import { AudiovisualVideo } from "../entities/AudivisualVideo";
import { ContentId } from "../entities/ValueObjects/ContendId";
import { FranchiseId } from "../entities/ValueObjects/FranchiseId";


export interface AudiovisualUserRepository {
    getPopularContent(): Promise<AudiovisualContent[]>;
    getHeroRandomVideo(): Promise<AudiovisualVideo[]>;
    getContentsFilter(gener: string | null, format: string | null, title: string | null,limit: number, page: number): Promise<{
        data: AudiovisualContent[],
        total: number,
        nextPage: number | null,
        prevPage: number | null,
        totalPage: number
    }>;
    getContentId(id: ContentId): Promise<AudiovisualContent | null>;
    getContentFranchiseId(franchiseId: FranchiseId): Promise<AudiovisualContent[]>;
}