import { Request, Response } from 'express';
import prisma from '../prismaClient';
import { SignupMedicoDto, SignupHospitalDto } from '../validators/signupDto';
import { validate } from 'class-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function signup(req: Request, res: Response) {
  const data = req.body;
  const { role } = data;

  try {
    if (role === 'medico') {
      const dto = Object.assign(new SignupMedicoDto(), data);
      const errors = await validate(dto);
      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      const passwordHash = await bcrypt.hash(dto.password, 12);

      const user = await prisma.user.create({
        data: {
          role,
          email: dto.email,
          password_hash: passwordHash,
          name: dto.name
        }
      });

      // Create medico profile separately because UserCreateInput may not accept nested 'medicoProfile'
      await (prisma as any).medicoProfile.create({
        data: {
          userId: user.id,
          crm: dto.crm,
          phone: dto.phone,
          specialties: dto.specialty.split(',').map((s: string) => s.trim())
        }
      });

      await (prisma as any).consent.createMany({
        data: [
          {
            userId: user.id,
            scope: 'essential',
            granted: dto.consentEssential,
            ipAddress: req.ip,
            userAgent: req.headers['user-agent'] || ''
          },
          {
            userId: user.id,
            scope: 'marketing',
            granted: dto.consentMarketing ?? false,
            ipAddress: req.ip,
            userAgent: req.headers['user-agent'] || ''
          },
          {
            userId: user.id,
            scope: 'health_data',
            granted: dto.consentHealthData ?? false,
            ipAddress: req.ip,
            userAgent: req.headers['user-agent'] || ''
          }
        ]
      });

      return res.status(201).json({ message: 'Cadastro médico realizado com sucesso' });

    } else if (role === 'hospital') {
      const dto = Object.assign(new SignupHospitalDto(), data);
      const errors = await validate(dto);
      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      const passwordHash = await bcrypt.hash(dto.password, 12);

      const user = await prisma.user.create({
        data: {
          role,
          email: dto.email,
          password_hash: passwordHash,
          name: dto.hospitalName
        }
      });

      // Para hospital, considere criar perfil hospitalar conforme sua modelagem

      await (prisma as any).consent.createMany({
        data: [
          {
            userId: user.id,
            scope: 'essential',
            granted: dto.consentEssential,
            ipAddress: req.ip,
            userAgent: req.headers['user-agent'] || ''
          },
          {
            userId: user.id,
            scope: 'marketing',
            granted: dto.consentMarketing ?? false,
            ipAddress: req.ip,
            userAgent: req.headers['user-agent'] || ''
          },
          {
            userId: user.id,
            scope: 'health_data',
            granted: dto.consentHealthData ?? false,
            ipAddress: req.ip,
            userAgent: req.headers['user-agent'] || ''
          }
        ]
      });

      return res.status(201).json({ message: 'Cadastro hospitalar realizado com sucesso' });
    } else {
      return res.status(400).json({ error: 'Role inválido' });
    }
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ error: 'Erro interno no servidor' });
  }
}

// Rota de login temporária para testes locais.
// ATENÇÃO: Esta implementação é apenas para ambiente de desenvolvimento.
// REMOVER EM PRODUÇÃO e substituir por autenticação segura com verificação no banco.
export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  // Usuário de teste permitido temporariamente
  if (email === 'adm-vitor@capybaraworld.com' && password === '631330') {
    // Gerar um token JWT de teste (secret fraco apenas para dev)
    const token = jwt.sign({ email, role: 'admin', name: 'Vitor (teste)' }, process.env.JWT_SECRET || 'dev-secret', {
      expiresIn: '7d'
    });

    return res.status(200).json({ message: 'Login de teste bem-sucedido', token, user: { email, name: 'Vitor (teste)', role: 'admin' } });
  }

  // Caso contrário, tente autenticar contra o banco (se houver)
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: 'Credenciais inválidas' });

    const match = await bcrypt.compare(password, user.password_hash || '');
    if (!match) return res.status(401).json({ error: 'Credenciais inválidas' });

    const token = jwt.sign({ userId: user.id, role: user.role, name: user.name }, process.env.JWT_SECRET || 'dev-secret', { expiresIn: '7d' });
    return res.status(200).json({ message: 'Login bem-sucedido', token, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ error: 'Erro interno no servidor' });
  }
}