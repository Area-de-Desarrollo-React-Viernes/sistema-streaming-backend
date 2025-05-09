import { CreatePaymentPremiumMercadoPagoUseCase } from "../../../payments/application/use-case/CreatePaymentPremiumMercadoPagoUseCase";
import { StorePaymentUseCase } from "../../../payments/application/use-case/ChangeStatusPaymentUseCase";
import { SubscriptionMysqlPersistence } from "../../../payments/infrastructure/Persistence/SubscriptionMyselPersistence";
import { MercadoPagoPaymentService } from "../../../payments/infrastructure/service/MercadoPagoPaymentService"

const mercadoPagoService = new MercadoPagoPaymentService();
const subscriptionRepository = new SubscriptionMysqlPersistence();

export const paymentContainer = {
    paymentPremium: new CreatePaymentPremiumMercadoPagoUseCase(mercadoPagoService, subscriptionRepository),
    storePayment: new StorePaymentUseCase(subscriptionRepository),
}