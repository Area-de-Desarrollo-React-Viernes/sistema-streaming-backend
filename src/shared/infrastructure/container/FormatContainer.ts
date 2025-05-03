import { GetFormatsUseCase } from "../../../audiovisual/application/use-case/GetFormatsUseCase";
import { FormatMysqlService } from "../../../audiovisual/infrastructure/service/FormatMysqlService";

const formatService = new FormatMysqlService();

export const FormatContainer = {
    getFormats: new GetFormatsUseCase(formatService)
}