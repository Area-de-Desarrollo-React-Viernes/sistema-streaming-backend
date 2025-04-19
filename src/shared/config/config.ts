import dotenv from 'dotenv';

dotenv.config();
export const CONFIG = {
    server: {
        port: process.env.SERVER_PORT
    },
    database: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        name: process.env.DB_NAME
    },
    email: {
        email: process.env.EMAIL_USER,
        pass: process.env.EMAIL_TOKEN
    },
    jwt: {
        secretJWT: process.env.SECRET_JWT
    },
    user_test: {
        token: process.env.ID_USER
    },
}