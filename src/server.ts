import morgan from 'morgan';
import express from 'express';
import { CONFIG } from './shared/config/config';
import authRouter from './auth/routes/authRoutes';


const app = express();

app.use(express.json());
app.use(express.text());

app.use(morgan('dev'));

app.use('/api/auths', authRouter);

app.listen(CONFIG.server.port);
console.log(`Servidor en el puerto ${CONFIG.server.port}`);