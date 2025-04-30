import { AudiovisualContent } from "../entities/AudiovisualContent";
import { AudiovisualVideo } from "../entities/AudivisualVideo";


export interface AudiovisualUserRepository {
    getPopularContent(): Promise<AudiovisualContent[]>;
    getHeroRandomVideo(): Promise<AudiovisualVideo[]>;
}