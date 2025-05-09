export interface SubscriptionRepository {
    storeSuscription(payerId: string, userId: number, status: string, service: string): Promise<number>;
    verifiedSubscription(userId: number): Promise<boolean>;
    findSubscription(payerId: string): Promise<number | null>
    storePayment(payId: string, paymentMethod: string | null, paymentDate: string, subscriptionId: number): Promise<number>;
    updateStatusPayment(payId: string, paymentMethod: string): Promise<void>;
    updateStatusSubscription(payerId: string, status: string): Promise<void>;
}