export class SubscriptionResponse {
    constructor(
        public readonly id: string,
        public readonly payer_id: string,
        public readonly status: string,
        public readonly reason: string,
        public readonly amount: number,
        public readonly currency: string,
        public readonly frequency: number,
        public readonly frequencyType: string,
        public readonly payerEmail: string,
        public readonly init_point: string,
        public readonly createAt: Date
    ) {}
}