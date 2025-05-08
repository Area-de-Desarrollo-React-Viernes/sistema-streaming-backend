
export type MPFrequencyType = 'days' | 'months';
export type MPCurrency = 'PEN' | 'USD';

export class Subcription {
    constructor(
        public backUrl: string,
        public reason: string,
        public frequency: number,
        public frequencyType: MPFrequencyType,
        public transactionAmount: number,
        public currencyId: MPCurrency,
        public payerEmail: string,
        public payerName: string,
        public id?: string,
    ) { }
}