import { Image } from "../entities/Image";
import { ContentId } from "../entities/ValueObjects/ContendId";

export interface ImageContentService {
    getPopularContentImage(contentIds: number[]): Promise<Image[]>;
    getImageContent(idContent: ContentId): Promise<Image | null>;
}