import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import rateLimit from 'express-rate-limit';
import authRoutes from './routes/auth';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.set('trust proxy', 'loopback');

app.use(
  rateLimit({
    windowMs: 60 * 1000,
    max: 200,
  })
);

app.use('/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend rodando na porta ${PORT}`);
});