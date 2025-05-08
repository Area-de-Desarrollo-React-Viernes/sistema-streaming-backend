import { CreatePaymentPremiumMercadoPagoUseCase } from "../../../payments/application/use-case/CreatePaymentPremiumMercadoPagoUseCase";
import { MercadoPagoPaymentService } from "../../../payments/infrastructure/service/MercadoPagoPaymentService"

const mercadoPagoService = new MercadoPagoPaymentService();

export const paymentContainer = {
    paymentPremium: new CreatePaymentPremiumMercadoPagoUseCase(mercadoPagoService)
}