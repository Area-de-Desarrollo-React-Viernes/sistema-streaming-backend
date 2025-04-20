import path from "path";
//import admin from 'firebase-admin';
import { AuthGoogleService } from "../../domain/service/AuthGoogleService";
import { pool } from "../../../shared/infrastructure/database/database.config";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { UserExists } from "../../domain/exceptions/UserExists";
import { admin } from "../../../shared/infrastructure/firebase/firebase-google";
import jwt from "jsonwebtoken";
import { CONFIG } from "../../../shared/config/config";
import { UserNotFound } from "../../domain/exceptions/UserNotFound";
import { UserGoogle } from "../../domain/entities/UserGoogle";
import { User } from "../../domain/entities/User";

export class UserAuthGoogleService implements AuthGoogleService {
    async findUserGoogle(token: string): Promise<UserGoogle | null> {
        try {
            // const serviceAccount = path.resolve(__dirname, '../../../../spectra.json');
            // admin.initializeApp({
            //     credential: admin.credential.cert(serviceAccount)
            // });
            const decodedToken = await admin.auth().verifyIdToken(token);
            return new UserGoogle(
                decodedToken.name,
                decodedToken.email as string,
                decodedToken.sub,
                decodedToken.email_verified as boolean,
                decodedToken.firebase.sign_in_provider,
                decodedToken.picture as string
            );
        } catch (error: Error | any) {
            return null;
        }
    }
    async createUserGoogle(user: UserGoogle): Promise<string> {

        const [rows] = await pool.execute<RowDataPacket[]>('SELECT * FROM users WHERE login_type = ? AND provider_id = ?', [
            user.loginType, user.providerId
        ]);
        if (rows.length !== 0) {
            throw new UserExists;
        }
        const [userId] = await pool.execute<ResultSetHeader>('INSERT INTO users (username, email, provider_id, email_verified, login_type) values(?, ?, ?, ?, ?)', [
            user.username, user.email, user.providerId, user.emailVerified, user.loginType
        ]);
        const tokenJWT = jwt.sign({ sub: userId.insertId }, CONFIG.jwt.secretJWT as string, {
            expiresIn: '4h'
        });
        return tokenJWT;
    }
    async loginUserGoogle(user: UserGoogle): Promise<string> {
        const [rows] = await pool.execute<RowDataPacket[]>('SELECT * FROM users WHERE email = ? AND provider_id = ?', [
            user.email, user.providerId
        ]);
        if (rows.length === 0) {
            throw new UserNotFound;
        }
        const userId = rows[0];
        const tokenJWT = jwt.sign({ sub: userId.id }, CONFIG.jwt.secretJWT as string, {
            expiresIn: '4h'
        });
        return tokenJWT;
    }
}