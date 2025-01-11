import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import { connectToDatabase } from './infrastructure/database/mongo-config';
import userRoutes from './infrastructure/http/routes/user.routes';
import authRoutes from './infrastructure/http/routes/auth.routes';

dotenv.config();

const app: Application = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Conexión a la base de datos
connectToDatabase();

// Rutas
app.use('/auth', authRoutes);
//app.use('/users', userRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
