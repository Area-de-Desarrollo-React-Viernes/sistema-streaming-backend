import { MPFrequencyType, Subcription } from "../../domain/entities/Subcription";
import { UserEmail } from "../../domain/entities/value-objects/UserEmail";
import { UserName } from "../../domain/entities/value-objects/UserName";
import { SubscriptionRepository } from "../../domain/repository/SubscriptionRepository";
import { MercadoPagoService } from "../../domain/service/MercadoPagoService";
import { SubscriptionResponse } from "../dto/response/SubscriptionResponse";

export class CreatePaymentPremiumMercadoPagoUseCase {
    constructor(
        private mercadoPagoService: MercadoPagoService,
        private subscriptionRepository: SubscriptionRepository
    ) {}
    async run(userId: number, email: UserEmail, name: UserName, planType: 'basic' | 'premium'): Promise<SubscriptionResponse> {

        const plans = {
            basic: {
                description: 'Suscripción básica',
                amount: 20,
                frequency: 1,
                frequencyType: 'months'
            },
            premium: {
                description: 'Suscripción premium',
                amount: 45,
                frequency: 1,
                frequencyType: 'months'
            }
        };
        
        const selectPlan = plans[planType];

        const subcription: Subcription = {
            backUrl: 'https://spectra.joshuaherrera.com/dashboard',
            reason: selectPlan.description,
            frequency: selectPlan.frequency,
            frequencyType: selectPlan.frequencyType as MPFrequencyType,
            transactionAmount: selectPlan.amount,
            currencyId: 'PEN',
            payerEmail: email.value,
            payerName: name.value
        }
        const data = await this.mercadoPagoService.createPayment(subcription);
        const verified = await this.subscriptionRepository.verifiedSubscription(userId)

        if(!verified){
            await this.subscriptionRepository.storeSuscription(
                data.mpId,
                userId,
                data.status,
                data.reason
            );

        }

        const subscriptionId = await this.subscriptionRepository.findSubscription('2429506474');
        await this.subscriptionRepository.storePayment(
            data.id,
            null,
            data.createdAt,
            subscriptionId as number
        )
        return new SubscriptionResponse(
            data.id,
            data.mpId,
            data.status,
            data.reason,
            data.amount,
            data.currency,
            data.frequency,
            data.frequencyType,
            data.payerEmail,
            data.initPoint,
            data.createdAt
        );
    }
}