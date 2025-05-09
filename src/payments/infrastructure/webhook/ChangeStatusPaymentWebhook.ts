import { NextFunction, Request, Response } from "express";
import { CONFIG } from "../../../shared/config/config";
import { paymentContainer } from "../../../shared/infrastructure/container/PaymentContainer";

export const changeStatusPayment = (req: Request, res: Response, next: NextFunction) => {
    const dataPyament = req.body.data.id;
    getPreapproval(dataPyament);
    res.status(200).send('OK');
}

async function getPreapproval(payerId: string): Promise<void> {
    console.log(payerId)
    const url = `https://api.mercadopago.com/preapproval/${payerId}`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${CONFIG.mercado_pago.access_key}`,
            "Content-Type": "application/json"
        }
    });
    if(!response.ok){
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const paymentStatus = data.status;
    console.log(data);
    if(paymentStatus === 'authorized'){
        paymentContainer.storePayment.run(
            data.payer_id,
            data.id,
            data.payment_method_id,
            paymentStatus
        );
    }
}