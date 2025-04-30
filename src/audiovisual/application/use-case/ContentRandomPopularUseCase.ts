import { AudiovisualUserRepository } from "../../domain/repository/AudiovisualUserRepository";
import { ContentRandomPopularResponse } from "../dto/response/ContentRandomPopularResponse";

export class ContentRandomPopularUseCase {
    constructor(
        private contenUserRepository: AudiovisualUserRepository
    ) {}
    async run (): Promise<ContentRandomPopularResponse[]> {
        const content = await this.contenUserRepository.getHeroRandomVideo();
        return content.map((c) => {
            return new ContentRandomPopularResponse(
                c.id,
                c.title,
                c.releaseDate,
                c.description,
                c.urlYoutube
            );
        });
    }
}