import { AudiovisualUserRepository } from "../../domain/repository/AudiovisualUserRepository";
import { ImageContentService } from "../../domain/service/ImageContentService";
import { ContentRandomPopularResponse } from "../dto/response/ContentRandomPopularResponse";
import { ImageContentResponse } from "../dto/response/ImageContentResponse";

export class ContentRandomPopularUseCase {
    constructor(
        private contenUserRepository: AudiovisualUserRepository,
        private imageService: ImageContentService
    ) {}
    async run (): Promise<ContentRandomPopularResponse[]> {
        const content = await this.contenUserRepository.getHeroRandomVideo();

        const ids = content.map((c) => c.id);
        const images = await this.imageService.getPopularContentImage(ids);

        const imageMap = new Map<number, string>;
        images.forEach((img) => {
            if(img.imagebleId){
                imageMap.set(img.imagebleId, img.url);
            }
        });

        return content.map((c) => {
            const imageUrl = imageMap.get(c.id) || '';
            return new ContentRandomPopularResponse(
                c.id,
                c.title,
                c.releaseDate,
                c.description,
                c.urlYoutube,
                new ImageContentResponse(
                    imageUrl
                )
            );
        });
    }
}