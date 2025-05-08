export class SubcriptionData {
    constructor(
        public id: string,
        public mpId: string,
        public status: string,
        public reason: string,
        public amount: number,
        public currency: string,
        public frequency: number,
        public frequencyType: 'days' | 'months',
        public payerEmail: string,
        public initPoint: string,
        public createdAt: Date
    ) {}
}

