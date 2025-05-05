import { Image } from "../entities/Image";
import { ContentId } from "../entities/ValueObjects/ContendId";
import { FranchiseId } from "../entities/ValueObjects/FranchiseId";

export interface ImageContentService {
    getPopularContentImage(contentIds: number[]): Promise<Image[]>;
    getImageContent(idContent: ContentId): Promise<Image | null>;
    getFranchiseImage(idFranchise: FranchiseId): Promise<Image | null>;
}