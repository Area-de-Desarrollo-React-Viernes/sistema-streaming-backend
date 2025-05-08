import { Subcription } from "../../domain/entities/Subcription";
import { UserEmail } from "../../domain/entities/value-objects/UserEmail";
import { UserName } from "../../domain/entities/value-objects/UserName";
import { MercadoPagoService } from "../../domain/service/MercadoPagoService";
import { SubscriptionResponse } from "../dto/response/SubscriptionResponse";

export class CreatePaymentPremiumMercadoPagoUseCase {
    constructor(
        private mercadoPagoService: MercadoPagoService
    ) {}
    async run(email: UserEmail, name: UserName): Promise<SubscriptionResponse> {
        const subcription: Subcription = {
            backUrl: 'https://spectra.joshuaherrera.com/',
            reason: 'Subcripcion premium',
            frequency: 1,
            frequencyType: 'months',
            transactionAmount: 45,
            currencyId: 'PEN',
            payerEmail: email.value,
            payerName: name.value
        }
        const data = await this.mercadoPagoService.createPayment(subcription);
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