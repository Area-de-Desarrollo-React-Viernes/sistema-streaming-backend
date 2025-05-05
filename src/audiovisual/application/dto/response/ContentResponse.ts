import { GenerResponse } from "./GenerResponse";
import { ImageContentResponse } from "./ImageContentResponse";

export class ContentResponse {
    constructor(
        public readonly id: number,
        public readonly title: string,
        public readonly realese_date: string,
        public readonly exclusiveness: boolean,
        public readonly views: number,
        public readonly urlYoutebe: string,
        public readonly franchise: number,
        public readonly gener: GenerResponse,
        public readonly image: ImageContentResponse,
    ) {}
}