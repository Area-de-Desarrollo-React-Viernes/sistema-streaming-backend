import { ImageContentResponse } from "./ImageContentResponse";

export class ContentFranchiseResponse {
    constructor(
        public readonly id: number,
        public readonly title: string,
        public readonly realese_date: string,
        public readonly exclusiveness: boolean,
        public readonly views: number,
        public readonly image: ImageContentResponse
    ) {}
}