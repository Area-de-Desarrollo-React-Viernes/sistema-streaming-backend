import jwt from 'jsonwebtoken';
import { CONFIG } from '../../config/config';

export class JwtService {
    static verify(token: string): any {
        return jwt.verify(token, CONFIG.jwt.secretJWT as string);
    }
}