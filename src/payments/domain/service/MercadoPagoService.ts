import { Subcription } from "../entities/Subcription";
import { SubcriptionData } from "../entities/SubcriptionData";

export interface MercadoPagoService {
    createPayment(subcription: Subcription): Promise<SubcriptionData>
}