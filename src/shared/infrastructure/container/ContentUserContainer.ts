import { ContentFilterPaginateUseCase } from "../../../audiovisual/application/use-case/ContentFilterPaginateUseCase";
import { ContentPopularUseCase } from "../../../audiovisual/application/use-case/ContentPopularUseCase";
import { ContentRandomPopularUseCase } from "../../../audiovisual/application/use-case/ContentRandomPopularUseCase";
import { GetContentUseCase } from "../../../audiovisual/application/use-case/GetContentUseCase";
import { AudiovisualUserRepository } from "../../../audiovisual/domain/repository/AudiovisualUserRepository";
import { AudiovisualUserMysqlPersistence } from "../../../audiovisual/infrastructure/persistence/AudiovisualUserMysqlPeristence";
import { GenerMysqlService } from "../../../audiovisual/infrastructure/service/GenerMysqlService";
import { ImageContentMysqlService } from "../../../audiovisual/infrastructure/service/ImageContentMysqlService";

const contentUserRepository = new AudiovisualUserMysqlPersistence();
const imageUserService = new ImageContentMysqlService(); 
const generService = new GenerMysqlService();

export const ContentUserContainer = {
    popularContent: new ContentPopularUseCase(contentUserRepository, imageUserService),
    randomPopular: new ContentRandomPopularUseCase(contentUserRepository, imageUserService),
    filterContentPaginate: new ContentFilterPaginateUseCase(contentUserRepository, imageUserService),
    getContent: new GetContentUseCase(contentUserRepository, imageUserService, generService)
}