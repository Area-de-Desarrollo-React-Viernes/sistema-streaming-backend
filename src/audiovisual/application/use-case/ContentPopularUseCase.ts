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
        const image = await this.imageService.getPopularContentImage();
        
        return content.map((c, index) => {
            const imageUrl = image[index]?.url || '';
            return new ContentPopularResponse(
                    c.id,
                    c.title,
                    c.releaseDate,
                    c.exclusiveness as boolean,
                    c.views as number,
                    new ImageContentResponse(imageUrl)
            )
        });
    }
}