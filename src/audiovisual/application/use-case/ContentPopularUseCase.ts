import { AudiovisualUserRepository } from "../../domain/repository/AudiovisualUserRepository";
import { ImageContentService } from "../../domain/service/ImageContentService";
import { ContentPopularResponse } from "../dto/response/ContentPopularResponse";
import { ImageContentResponse } from "../dto/response/ImageContentResponse";

export class ContentPopularUseCase {
    constructor(
        private audiovisualUserRepository: AudiovisualUserRepository,
        private imageService: ImageContentService
    ) { }
    async run(): Promise<ContentPopularResponse[]> {
        const content = await this.audiovisualUserRepository.getPopularContent();

        const ids = content.map((c) => c.id);
        const images = await this.imageService.getPopularContentImage(ids);

        const imageMap = new Map<number, string>();
        images.forEach(img => {
            if (img.imagebleId) {
                imageMap.set(img.imagebleId, img.url);
            }
        });

        return content.map((c) => {
            const imageUrl = imageMap.get(c.id) || '';
            return new ContentPopularResponse(
                c.id,
                c.title,
                c.releaseDate,
                c.exclusiveness as boolean,
                c.views as number,
                new ImageContentResponse(imageUrl)
            );
        });
    }
}