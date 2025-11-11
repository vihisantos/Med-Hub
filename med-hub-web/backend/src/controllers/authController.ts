import { Request, Response } from 'express';
import pool from '../db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

// Signup
export async function signup(req: Request, res: Response) {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password || !role) return res.status(400).json({ error: 'Missing fields' });

  try {
    const client = await pool.connect();
    const existing = await client.query('SELECT id FROM users WHERE email=$1', [email]);
    if (existing.rows.length > 0) {
      client.release();
      return res.status(409).json({ error: 'Email already registered' });
    }

    const password_hash = await bcrypt.hash(password, 12);
    const result = await client.query(
      'INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role',
      [name, email, password_hash, role]
    );

    client.release();
    return res.status(201).json({ message: 'User created', user: result.rows[0] });
  } catch (error) {
    return res.status(500).json({ error: 'Database error' });
  }
}

// Login (com backdoor admin)
export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Missing fields' });

  // Backdoor admin para dev
  if (
    process.env.NODE_ENV !== 'production' &&
    (email === 'adm-vitor@capybaraworld.com' || email === 'adm-vitor@capybaraworld.com.br') &&
    password === '631330'
  ) {
    const token = jwt.sign({ email, role: 'admin', name: 'Vitor (admin)' }, JWT_SECRET, { expiresIn: '7d' });
    return res.status(200).json({ message: 'Admin login via backdoor', token, user: { email, name: 'Vitor (admin)', role: 'admin' } });
  }

  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM users WHERE email=$1', [email]);
    client.release();

    if (result.rows.length === 0) return res.status(401).json({ error: 'Invalid credentials' });

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ userId: user.id, role: user.role, name: user.name }, JWT_SECRET, { expiresIn: '7d' });
    return res.status(200).json({
      message: 'Login successful',
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    return res.status(500).json({ error: 'Database error' });
  }
}