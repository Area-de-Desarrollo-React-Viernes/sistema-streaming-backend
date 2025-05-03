import { ContentId } from "../../domain/entities/ValueObjects/ContendId";
import { ContetnNotFound } from "../../domain/exceptions/ContetnNotFound";
import { AudiovisualUserRepository } from "../../domain/repository/AudiovisualUserRepository";
import { GenerService } from "../../domain/service/GenerService";
import { ImageContentService } from "../../domain/service/ImageContentService";
import { ContentResponse } from "../dto/response/ContentResponse";
import { GenerResponse } from "../dto/response/GenerResponse";
import { ImageContentResponse } from "../dto/response/ImageContentResponse";

export class GetContentUseCase {
    constructor(
        private contentRepository: AudiovisualUserRepository,
        private imageService: ImageContentService,
        private generService: GenerService
    ) {}
    async run (id: number): Promise<ContentResponse> {
        const content = await this.contentRepository.getContentId(new ContentId(id));
        if(!content){
            throw new ContetnNotFound();
        }
        const image = await this.imageService.getImageContent(new ContentId(id));
        const gener = await this.generService.getGenerByContent(new ContentId(id));
        return new ContentResponse(
            content.id,
            content.title,
            content.releaseDate,
            content.exclusiveness as boolean,
            content.views as number,
            content.urlYoutube as string,
            content.franchiseId as string,
            new GenerResponse(
                gener?.id as number,
                gener?.name as string
            ),
            new ImageContentResponse(
                image?.url as string
            )
        );
    }
}