import path from "path";
//import admin from 'firebase-admin';
import { AuthGoogleService } from "../../domain/service/AuthGoogleService";
import { pool } from "../../../shared/infrastructure/database/database.config";
import { RowDataPacket } from "mysql2";
import { UserExists } from "../../domain/exceptions/UserExists";
import { admin } from "../../../shared/infrastructure/firebase/firebase-google";
import jwt from "jsonwebtoken";
import { CONFIG } from "../../../shared/config/config";

export class UserAuthGoogleService implements AuthGoogleService {
    async createUserGoogle(token: string): Promise<string> {
        // const serviceAccount = path.resolve(__dirname, '../../../../spectra.json');
        // admin.initializeApp({
        //     credential: admin.credential.cert(serviceAccount)
        // });
        const decodedToken = await admin.auth().verifyIdToken(token);

        const [rows] = await pool.execute<RowDataPacket[]>('SELECT * FROM users WHERE login_type = ? AND provider_id = ?', [
            decodedToken.firebase.sign_in_provider, decodedToken.sub
        ]);
        if (rows.length !== 0) {
            throw new UserExists;
        }
        await pool.execute('INSERT INTO users (username, email, provider_id, email_verified, login_type) values(?, ?, ?, ?, ?)', [
            decodedToken.name, decodedToken.email, decodedToken.sub, decodedToken.email_verified, decodedToken.firebase.sign_in_provider
        ]);
        const tokenJWT = jwt.sign({provider_id: decodedToken.sub}, CONFIG.jwt.secretJWT as string, {
            expiresIn: '4h'
        });
        return tokenJWT;
    }
}