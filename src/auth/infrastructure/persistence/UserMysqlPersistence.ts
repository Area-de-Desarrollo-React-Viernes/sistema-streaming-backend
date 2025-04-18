import { pool } from "../../../shared/infrastructure/database/database.config";
import { User } from "../../domain/entities/User";
import bcrypt from 'bcrypt';
import { AuthenticateRepository } from "../../domain/repository/AuthenticateRepository";
import { UserEmailMysql } from "./types/UserMysql";
import { UserEmail } from "../../domain/entities/value-objects/UserEmail";
import { RowDataPacket } from "mysql2";
import { UserUsername } from "../../domain/entities/value-objects/UserUsername";
export class UserMysqlPersistence implements AuthenticateRepository {
    async createUserRegisterEmail(user: User): Promise<User> {
        if (!user.password) {
            throw new Error('No se encontro la contraseña');
        }
        const passwordHash = await bcrypt.hash(user.password, 10);
        pool.execute('INSERT INTO users (username, email, password) VALUES(?, ?, ?)', [
            user.username, user.email, passwordHash
        ]);
        return new User(
            user.username,
            user.password
        );
    }
    async getByEmail(email: UserEmail): Promise<User | null> {
        const [rows] = await pool.execute<UserEmailMysql[] & RowDataPacket[]>('SELECT username, email, password users WHERE email = ?', [email.value]);
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
} 