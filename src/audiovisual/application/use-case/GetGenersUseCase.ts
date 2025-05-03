import { GenerService } from "../../domain/service/GenerService";
import { GenerResponse } from "../dto/response/GenerResponse";

export class GetGenersUseCase {
    constructor(
        private generServic: GenerService
    ) {}
    async run(): Promise<GenerResponse[]> {
        const geners = await this.generServic.getGeners();

        return geners.map((g) => {
            return new GenerResponse(
                g.id,
                g.name
            );
        });
    }
}