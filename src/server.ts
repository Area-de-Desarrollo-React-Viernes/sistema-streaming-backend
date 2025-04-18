import morgan from 'morgan';
import dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import { CONFIG } from './shared/config/config';
import { HandlerException } from './shared/domain/HandlerException';
import authRouter from './auth/routes/authRoutes';


const app = express();

app.use(express.json());
app.use(express.text());

app.use(morgan('dev'));

app.use('/api/auths', authRouter);

app.listen(CONFIG.server.port);
console.log(`Servidor en el puerto ${CONFIG.server.port}`);