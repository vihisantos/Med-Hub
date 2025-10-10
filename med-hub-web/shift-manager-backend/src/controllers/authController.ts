import { Request, Response } from 'express';
import prisma from '../prismaClient';
import { SignupMedicoDto, SignupHospitalDto } from '../validators/signupDto';
import { validate } from 'class-validator';
import bcrypt from 'bcrypt';

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
          name: dto.name,
          phone: dto.phone,
          consent_given: dto.consentEssential,
          medicoProfile: {
            create: {
              crm: dto.crm,
              specialties: dto.specialty.split(',').map((s: string) => s.trim())
            }
          }
        }
      });

      await prisma.consent.createMany({
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
          name: dto.hospitalName,
          consent_given: dto.consentEssential
        }
      });

      // Para hospital, considere criar perfil hospitalar conforme sua modelagem

      await prisma.consent.createMany({
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