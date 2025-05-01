import { Image } from "../entities/Image";

export interface ImageContentService {
    getPopularContentImage(contentIds: number[]): Promise<Image[]>;
}