import { Gener } from "../entities/Gener";
import { ContentId } from "../entities/ValueObjects/ContendId";

export interface GenerService {
    getGeners(): Promise<Gener[]>;
    getGenerByContent(contenId: ContentId): Promise<Gener | null>;
}