import { RegistersNotFound } from "../../domain/exceptions/RegistersNotFound";
import { AudiovisualUserRepository } from "../../domain/repository/AudiovisualUserRepository";
import { ImageContentService } from "../../domain/service/ImageContentService";
import { ContentPopularResponse } from "../dto/response/ContentPopularResponse";
import { ImageContentResponse } from "../dto/response/ImageContentResponse";
import { PaginateResponse } from "../dto/response/PaginateResponse";

export class ContentFilterPaginateUseCase {
    constructor(
        private contenUserRepository: AudiovisualUserRepository,
        private imageContentService: ImageContentService
    ) { }
    async run(gener: string | null, format: string | null, limit: number = 10, page: number = 1): Promise<{
        contents: ContentPopularResponse[],
        paginate: PaginateResponse
    }> {
        const {
            data,
            total,
            nextPage,
            prevPage,
            totalPage
        } = await this.contenUserRepository.getContentsFilter(gener, format, limit, page);
        if(data.length === 0){
            throw new RegistersNotFound;
        }
        const contentIds = data.map((c) => c.id);
        const images = await this.imageContentService.getPopularContentImage(contentIds);

        const imageMap = new Map<number, string>();
        images.forEach(img => {
            if (img.imagebleId) {
                imageMap.set(img.imagebleId, img.url);
            }
        });

        const items = data.map((c) => {
            const imageUrl = imageMap.get(c.id) || '';
            return new ContentPopularResponse(
                c.id,
                c.title,
                c.releaseDate,
                c.exclusiveness as boolean,
                c.views as number,
                c.franchiseId as number,
                new ImageContentResponse(imageUrl)
            );
        });
        const paginate = new PaginateResponse(
            total,
            nextPage,
            prevPage,
            totalPage
        );

        return {contents: items, paginate: paginate};
    }
}