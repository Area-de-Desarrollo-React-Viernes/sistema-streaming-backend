import { AudiovisualContent } from "../entities/AudiovisualContent";


export interface AudiovisualUserRepository {
    getPopularContent(): Promise<AudiovisualContent[]>;

}