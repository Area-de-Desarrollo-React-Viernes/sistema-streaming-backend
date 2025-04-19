import mysql2 from 'mysql2/promise';
import { CONFIG } from '../../config/config';

export const pool = mysql2.createPool({
    host: CONFIG.database.host,
    port: CONFIG.database.port,
    user: CONFIG.database.user,
    password: CONFIG.database.password,
    database: CONFIG.database.name,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 10
});