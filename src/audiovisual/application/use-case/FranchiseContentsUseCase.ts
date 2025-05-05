import { FranchiseId } from "../../domain/entities/ValueObjects/FranchiseId";
import { AudiovisualUserRepository } from "../../domain/repository/AudiovisualUserRepository";
import { FranchiseService } from "../../domain/service/FranchiseService";
import { ImageContentService } from "../../domain/service/ImageContentService";
import { ContentPopularResponse } from "../dto/response/ContentPopularResponse";
import { FranchiseContentResponse } from "../dto/response/FranchiseContentResponse";
import { ImageContentResponse } from "../dto/response/ImageContentResponse";

export class FranchiseContentsUseCase {
    constructor(
        private contentRepository: AudiovisualUserRepository,
        private franchiseService: FranchiseService,
        private imageService: ImageContentService
    ) {}
    async run(franchiseId: number): Promise<FranchiseContentResponse> {
        const franchise = await this.franchiseService.getFranchise(new FranchiseId(franchiseId));
        const imageFranchise = await this.imageService.getFranchiseImage(new FranchiseId(franchiseId));

        const contents = await this.contentRepository.getContentFranchiseId(new FranchiseId(franchiseId));
        const idsContents = contents.map((c) => c.id);
        const imageContetns = await this.imageService.getPopularContentImage(idsContents);

        const iamgeMap = new Map<number, string>;
        imageContetns.forEach((i) => {
            iamgeMap.set(i.imagebleId, i.url);
        });

        return new FranchiseContentResponse(
            franchise.id,
            franchise.title,
            franchise.description,
            franchise.generId as number,
            new ImageContentResponse(
                imageFranchise?.url || ''
            ),
            contents.map((c) => {
                const imageUrl = iamgeMap.get(c.id) || '';
                return new ContentPopularResponse(
                    c.id,
                    c.title,
                    c.releaseDate,
                    c.exclusiveness as boolean,
                    c.views as number,
                    new ImageContentResponse(
                        imageUrl
                    )
                );
            })
        );
        
    }
}