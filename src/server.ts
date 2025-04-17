import morgan from 'morgan';
import dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import { exceptionMiddleware } from './shared/interface/middleware/HandlerExceptionMiddleware';
import { HandlerException } from './shared/domain/HandlerException';
import { CONFIG } from './shared/config/config';

const app = express();

app.use(express.json());
app.use(express.text());

app.use(morgan('dev'));

app.use(exceptionMiddleware);

app.listen(CONFIG.server.port);
console.log(`Servidor en el puerto ${CONFIG.server.port}`);