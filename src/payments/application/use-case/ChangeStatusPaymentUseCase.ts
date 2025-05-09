import { SubscriptionRepository } from "../../domain/repository/SubscriptionRepository";

export class StorePaymentUseCase {
    constructor(
        private subcriptionRepository: SubscriptionRepository
    ) {}
    async run(payerId: string, payId: string, paymentMethod: string, status: string): Promise<void> {

        await this.subcriptionRepository.updateStatusPayment(payId, paymentMethod);
        await this.subcriptionRepository.updateStatusSubscription(payerId, status);
    }
}