import morgan from 'morgan';
import express from 'express';
import { CONFIG } from './shared/config/config';
import authRouter from './auth/routes/authRoutes';
import path from 'path';
import cors from 'cors';

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.text());

app.use(morgan('dev'));

app.use('/api/auths', authRouter);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(CONFIG.server.port);
console.log(`Servidor en el puerto ${CONFIG.server.port}`);