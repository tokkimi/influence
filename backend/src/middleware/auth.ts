import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'magali-berdah-secret-2024';

export interface AuthRequest extends Request {
  user?: { id: string; role: string; email: string };
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token manquant' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: 'Token invalide' });
  }
};

export const requireAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user?.role !== 'admin') return res.status(403).json({ error: 'Accès refusé' });
  next();
};

export const requirePro = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!['pro', 'admin'].includes(req.user?.role || '')) return res.status(403).json({ error: 'Accès pro requis' });
  next();
};

export const signToken = (user: { id: string; role: string; email: string }) =>
  jwt.sign(user, JWT_SECRET, { expiresIn: '30d' });
