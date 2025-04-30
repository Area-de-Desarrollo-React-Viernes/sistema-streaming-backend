import { ContentPopularUseCase } from "../../../audiovisual/application/use-case/ContentPopularUseCase";
import { AudiovisualUserRepository } from "../../../audiovisual/domain/repository/AudiovisualUserRepository";
import { AudiovisualUserMysqlPersistence } from "../../../audiovisual/infrastructure/persistence/AudiovisualUserMysqlPeristence";
import { ImageContentMysqlService } from "../../../audiovisual/infrastructure/service/ImageContentMysqlService";

const contentUserRepository = new AudiovisualUserMysqlPersistence();
const imageUserService = new ImageContentMysqlService(); 

export const ContentUserContainer = {
    popularContent: new ContentPopularUseCase(contentUserRepository, imageUserService)
}