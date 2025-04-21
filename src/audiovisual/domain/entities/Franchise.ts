export class Franchise {
    constructor(
        public id: number,
        public title: string,
        public description: string,
        public releaseDate: string,
        public exclusiveness: boolean | null = null,
        public views: number | null = null,
        public urlYoutube: string | null = null,
        public formatTypeId: string | null = null,
        public generId: string | null = null,
        public franchiseId: string | null = null
    ) { }
}