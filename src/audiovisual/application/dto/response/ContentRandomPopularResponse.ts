import { ImageContentResponse } from "./ImageContentResponse";

export class ContentRandomPopularResponse {
    constructor(
        public readonly id: number,
        public readonly title: string,
        public readonly realease_date: string,
        public readonly description: string,
        public readonly video: string,
        public readonly franchise: number,
        public readonly image: ImageContentResponse
    ) {}
}