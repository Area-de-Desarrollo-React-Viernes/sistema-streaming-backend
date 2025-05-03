import { FormatService } from "../../domain/service/FormatService";
import { FormatResponse } from "../dto/response/FormatResponse";

export class GetFormatsUseCase {
    constructor(
        private formatService: FormatService
    ) {}
    async run(): Promise<FormatResponse[]> {
        const formats = await this.formatService.getFormats();

        return formats.map((f) => {
            return new FormatResponse(
                f.id,
                f.name
            );
        });
    }
}