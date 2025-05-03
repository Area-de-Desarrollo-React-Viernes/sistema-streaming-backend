export class PaginateResponse {
    constructor(
        public readonly total: number,
        public readonly nextPage: number | null,
        public readonly prevPage: number | null,
        public readonly totalPages: number  
    ) {}
}