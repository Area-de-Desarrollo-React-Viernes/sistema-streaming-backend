export class Franchise {
    constructor(
        public id: number,
        public title: string,
        public description: string,
        public generId: number | null = null,
        public formatTypeId: number | null = null,
    ) { }
}