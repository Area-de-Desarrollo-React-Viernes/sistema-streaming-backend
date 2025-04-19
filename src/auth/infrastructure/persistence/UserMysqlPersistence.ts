import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { format } from 'date-fns';
import { RowDataPacket } from "mysql2";
import { User } from "../../domain/entities/User";
import { CONFIG } from '../../../shared/config/config';
import { UserInfoMysql } from "./types/UserInfoMysql";
import { UserEmailMysql } from "./types/UserEmailMysql";
import { UserNotFound } from '../../domain/exceptions/UserNotFound';
import { UserEmail } from "../../domain/entities/value-objects/UserEmail";
import { CredentialInvalid } from "../../domain/exceptions/CredentialInvalid";
import { pool } from "../../../shared/infrastructure/database/database.config";
import { UserUsername } from "../../domain/entities/value-objects/UserUsername";
import { UserPassword } from "../../domain/entities/value-objects/UserPassword";
import { AuthenticateRepository } from "../../domain/repository/AuthenticateRepository";
import { UserCodeVerification } from "../../domain/entities/value-objects/UserCodeVerification";
export class UserMysqlPersistence implements AuthenticateRepository {
    async createUserRegisterEmail(user: User): Promise<User> {
        if (!user.password) {
            throw new Error('No se encontro la contraseña');
        }
        const passwordHash = await bcrypt.hash(user.password, 10);
        pool.execute('INSERT INTO users (username, email, password, login_type) VALUES(?, ?, ?, ?)', [
            user.username, user.email, passwordHash, 'email'
        ]);
        return new User(
            user.username,
            user.email
        );
    }
    async getByEmail(email: UserEmail): Promise<User | null> {
        const [rows] = await pool.execute<UserEmailMysql[] & RowDataPacket[]>('SELECT username, email, password FROM users WHERE email = ?', [email.value]);
        if (rows.length === 0) {
            return null;
        }
        const user = rows[0];
        return new User(
            user.username,
            user.email
        );
    }
    async updateUsername(username: UserUsername, email: UserEmail): Promise<User> {
        if (!username) {
            throw new Error('No se encontro la contraseña');
        }
        pool.execute('UPDATE users SET username = ? WHERE email = ?', [username.value, email.value]);
        return new User(
            username.value,
            email.value
        );
    }
    async updateCodeGenerate(codeVerification: UserCodeVerification, email: UserEmail): Promise<void> {
        const expiration = new Date(Date.now() + 5 * 60 * 1000);
        const formattedExpiration = format(expiration, 'yyyy-MM-dd HH:mm:ss');
        await pool.execute('UPDATE users SET code_verification = ?, time_expired = ? WHERE email = ?', 
        [codeVerification.value, formattedExpiration, email.value]);
    }
    async loginUser(email: UserEmail, password: UserPassword): Promise<string> {
        const [rows] = await pool.execute<UserInfoMysql[] & RowDataPacket[]>('SELECT id, username, email, password FROM users WHERE email = ?', [
            email.value 
        ]);
        const user = rows[0];
        if (rows.length === 0) {
            throw new UserNotFound;
        }
        if(!bcrypt.compareSync(password.value, user.password)){
            throw new CredentialInvalid;
        }
        const token = jwt.sign({sub: user.id}, CONFIG.jwt.secretJWT as string, {
            expiresIn: '4h'
        });
        return token;
    }
    async updatePassword(codeVerification: UserCodeVerification, newPassword: UserPassword, email: UserEmail): Promise<void> {
        const [rows] = await pool.execute<RowDataPacket[]>('SELECT * FROM users WHERE email = ? AND code_verification = ?', [
            email.value, codeVerification.value
        ]);
        if (rows.length === 0) {
            throw new CredentialInvalid;
        }
        const passwordHash = await bcrypt.hash(newPassword.value, 10);
        await pool.execute('UPDATE users SET password = ?, code_verification = ? WHERE email = ?', [
            passwordHash, null, email.value
        ]);
    }
} 