export class AudiovisualContent {
    constructor(
        public id: number,
        public title: string,
        public releaseDate: string,
        public exclusiveness: boolean | null = null,
        public views: number | null = null,
        public urlYoutube: string | null = null,
        public franchiseId: string | null = null
    ) { }
}