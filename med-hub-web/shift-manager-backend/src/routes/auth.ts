import { Router } from 'express';
import { signup, login } from '../controllers/authController';

const router = Router();

router.post('/signup', signup);
// Rota temporária de login para testes locais (REMOVER EM PRODUÇÃO)
router.post('/login', login);

export default router;