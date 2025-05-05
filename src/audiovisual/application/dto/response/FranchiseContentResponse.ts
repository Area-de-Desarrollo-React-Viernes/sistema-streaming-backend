import { ContentFranchiseResponse } from "./ContentFranchiseResponse";
import { ContentPopularResponse } from "./ContentPopularResponse";
import { ImageContentResponse } from "./ImageContentResponse";

export class FranchiseContentResponse {
    constructor(
        public readonly id:number,
        public readonly title: string,
        public readonly description: string,
        public readonly generId: number,
        public readonly image: ImageContentResponse,
        public readonly contents: ContentFranchiseResponse[]
    ) {}
}