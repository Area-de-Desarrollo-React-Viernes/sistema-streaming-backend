import { Gener } from "../entities/Gener";

export interface GenerService {
    getGeners(): Promise<Gener[]>;
}