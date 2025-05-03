import { Format } from "../entities/Format";

export interface FormatService {
    getFormats(): Promise<Format[]>;
}