export class Franchise {
    constructor(
        public id: number,
        public title: string,
        public description: string,
        public formatTypeId: number | null = null,
        public generId: number | null = null,
    ) { }
}