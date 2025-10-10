import 'reflect-metadata';
import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth';


const app = express();

app.use(helmet());
app.use(bodyParser.json());

app.use(
  rateLimit({
    windowMs: 60 * 1000, // 1 minuto
    max: 100, // max 100 req por IP no período
  })
);

app.use('/auth', authRoutes);

// Middleware global de erro
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});