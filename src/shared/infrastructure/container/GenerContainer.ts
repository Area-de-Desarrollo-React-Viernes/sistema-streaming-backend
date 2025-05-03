import { GetGenersUseCase } from "../../../audiovisual/application/use-case/GetGenersUseCase";
import { GenerMysqlService } from "../../../audiovisual/infrastructure/service/GenerMysqlService"

const generService = new GenerMysqlService(); 

export const GenerContainer = {
    getGeners: new GetGenersUseCase(generService)
}