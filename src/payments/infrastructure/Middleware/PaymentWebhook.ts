import { Request, Response } from "express";

export const inspectWebhook = (req: Request, res: Response): void => {
    //console.log('📥 Webhook recibido - Body:', JSON.stringify(req.body, null, 2));
    //console.log('📥 Webhook recibido - Query:', JSON.stringify(req.query, null, 2));
    const idPayer = req.body.data.id
    console.warn(idPayer);
    getPreapproval(idPayer);
    res.sendStatus(200); // opcional, solo para confirmar recepción
};

async function getPreapproval(idPayer: string): Promise<void> {
    const url = `https://api.mercadopago.com/preapproval/${idPayer}`;
    const token = "APP_USR-5957119924724935-041214-e0c53704de882e572b5110dfc5364984-2384399435";

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.error(data.status);
        console.log(typeof data.date_created);
        console.log(data.payment_method_id);
        console.log("Respuesta de la API:", data);
    } catch (error) {
        console.error("Error al realizar la solicitud:", error);
    }
}