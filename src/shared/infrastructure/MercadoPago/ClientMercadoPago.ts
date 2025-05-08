import mercadopago from "mercadopago"
import { CONFIG } from "../../config/config";

export const mercadoPago = () => {
    return mercadopago.configure({
        access_token: CONFIG.mercado_pago.access_key as string
    });
}