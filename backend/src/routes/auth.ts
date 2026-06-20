import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import db from '../database';
import { authenticate, signToken, AuthRequest } from '../middleware/auth';

const router = Router();

router.post('/register', (req: Request, res: Response) => {
  const { email, password, name, role = 'buyer', siret, shopName, phone, country = 'FR' } = req.body;
  if (!email || !password || !name) return res.status(400).json({ error: 'Champs requis manquants' });

  const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
  if (existing) return res.status(409).json({ error: 'Email déjà utilisé' });

  const hash = bcrypt.hashSync(password, 10);
  const id = uuidv4();
  const userRole = role === 'pro' ? 'pro' : 'buyer';

  db.prepare('INSERT INTO users (id, email, password_hash, name, role, phone, country) VALUES (?, ?, ?, ?, ?, ?, ?)').run(id, email, hash, name, userRole, phone || null, country);

  if (userRole === 'pro') {
    const shopId = uuidv4();
    db.prepare('INSERT INTO shops (id, user_id, shop_name, siret, commission_rate) VALUES (?, ?, ?, ?, ?)').run(shopId, id, shopName || name, siret || null, 20);
  }

  const user = db.prepare('SELECT id, email, name, role, avatar, verified FROM users WHERE id = ?').get(id) as any;
  const token = signToken({ id: user.id, role: user.role, email: user.email });
  res.json({ token, user });
});

router.post('/login', (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email et mot de passe requis' });

  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email) as any;
  if (!user) return res.status(401).json({ error: 'Identifiants incorrects' });
  if (user.banned) return res.status(403).json({ error: 'Compte suspendu' });
  if (!bcrypt.compareSync(password, user.password_hash)) return res.status(401).json({ error: 'Identifiants incorrects' });

  db.prepare("UPDATE users SET last_login = datetime('now') WHERE id = ?").run(user.id);

  let shop = null;
  if (user.role === 'pro' || user.role === 'admin') {
    shop = db.prepare('SELECT * FROM shops WHERE user_id = ?').get(user.id);
  }

  const token = signToken({ id: user.id, role: user.role, email: user.email });
  const { password_hash, ...safeUser } = user;
  res.json({ token, user: safeUser, shop });
});

router.get('/me', authenticate, (req: AuthRequest, res: Response) => {
  const user = db.prepare('SELECT id, email, name, role, avatar, verified, phone, address, city, country, created_at, last_login, banned FROM users WHERE id = ?').get(req.user!.id) as any;
  if (!user) return res.status(404).json({ error: 'Utilisateur introuvable' });

  let shop = null;
  if (user.role === 'pro') {
    shop = db.prepare('SELECT * FROM shops WHERE user_id = ?').get(user.id);
  }
  res.json({ user, shop });
});

router.put('/me', authenticate, (req: AuthRequest, res: Response) => {
  const { name, phone, address, city, country } = req.body;
  db.prepare('UPDATE users SET name = ?, phone = ?, address = ?, city = ?, country = ? WHERE id = ?').run(name, phone, address, city, country, req.user!.id);
  const user = db.prepare('SELECT id, email, name, role, avatar, verified, phone, address, city, country FROM users WHERE id = ?').get(req.user!.id);
  res.json({ user });
});

router.put('/change-password', authenticate, (req: AuthRequest, res: Response) => {
  const { currentPassword, newPassword } = req.body;
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.user!.id) as any;
  if (!bcrypt.compareSync(currentPassword, user.password_hash)) return res.status(401).json({ error: 'Mot de passe actuel incorrect' });
  const hash = bcrypt.hashSync(newPassword, 10);
  db.prepare('UPDATE users SET password_hash = ? WHERE id = ?').run(hash, req.user!.id);
  res.json({ success: true });
});

export default router;
