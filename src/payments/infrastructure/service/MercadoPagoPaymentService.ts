import mercadopago from "mercadopago";
import { mercadoPago } from "../../../shared/infrastructure/MercadoPago/ClientMercadoPago";
import { Subcription } from "../../domain/entities/Subcription";
import { MercadoPagoService } from "../../domain/service/MercadoPagoService";
import { SubcriptionData } from "../../domain/entities/SubcriptionData";

export class MercadoPagoPaymentService implements MercadoPagoService {

    constructor() {
        mercadoPago();
    }
    async createPayment(subscription: Subcription): Promise<SubcriptionData> {
        const mpSubscription = await mercadopago.preapproval.create({
            back_url: subscription.backUrl,
            reason: subscription.reason,
            auto_recurring: {
                frequency: subscription.frequency,
                frequency_type: subscription.frequencyType,
                transaction_amount: subscription.transactionAmount,
                currency_id: subscription.currencyId
            },
            payer_email: subscription.payerEmail,
        })
        return {
            id: mpSubscription.body.id,
            mpId: mpSubscription.body.payer_id,
            status: mpSubscription.body.status,
            reason: mpSubscription.body.reason,
            amount: mpSubscription.body.auto_recurring.transaction_amount,
            currency: mpSubscription.body.auto_recurring.currency_id,
            frequency:mpSubscription.body.auto_recurring.frequency,
            frequencyType: mpSubscription.body.auto_recurring.frequency_type,
            payerEmail: mpSubscription.body.payer_email,
            initPoint: mpSubscription.response.init_point,
            createdAt: mpSubscription.body.date_created
        };
    };
}
