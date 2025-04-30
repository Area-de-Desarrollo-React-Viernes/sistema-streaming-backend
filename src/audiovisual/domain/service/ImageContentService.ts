import { Image } from "../entities/Image";

export interface ImageContentService {
    getPopularContentImage(): Promise<Image[]>;
}