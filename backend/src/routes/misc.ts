import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import db from '../database';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = Router();

// Categories
router.get('/categories', (_req: Request, res: Response) => {
  const cats = db.prepare('SELECT * FROM categories ORDER BY sort_order').all();
  res.json({ categories: cats });
});

// Brands (from items)
router.get('/brands', (_req: Request, res: Response) => {
  const brands = db.prepare("SELECT DISTINCT brand FROM items WHERE status = 'active' AND brand IS NOT NULL ORDER BY brand").all();
  res.json({ brands: brands.map((b: any) => b.brand) });
});

// SEO settings (public)
router.get('/seo', (_req: Request, res: Response) => {
  const seo = db.prepare("SELECT site_title, site_description, site_keywords, og_image FROM seo_settings WHERE id = 'global'").get();
  res.json({ seo });
});

// Newsletter subscribe
router.post('/newsletter/subscribe', (req: Request, res: Response) => {
  const { email, name, categories = [] } = req.body;
  if (!email) return res.status(400).json({ error: 'Email requis' });
  const existing = db.prepare('SELECT id FROM newsletter_subscribers WHERE email = ?').get(email);
  if (existing) {
    db.prepare('UPDATE newsletter_subscribers SET active = 1, categories = ? WHERE email = ?').run(JSON.stringify(categories), email);
  } else {
    db.prepare('INSERT INTO newsletter_subscribers (id, email, name, categories) VALUES (?, ?, ?, ?)').run(uuidv4(), email, name || null, JSON.stringify(categories));
  }
  res.json({ success: true });
});

// Analytics track visit
router.post('/analytics/track', (req: Request, res: Response) => {
  const { session_id, page, referrer } = req.body;
  const ip = req.ip || 'unknown';
  const country = req.headers['cf-ipcountry'] as string || 'FR';
  db.prepare('INSERT INTO analytics_visitors (id, session_id, ip, country, user_agent, page, referrer) VALUES (?, ?, ?, ?, ?, ?, ?)').run(
    uuidv4(), session_id, ip, country, req.headers['user-agent'] || '', page || '/', referrer || ''
  );
  res.json({ success: true });
});

// Favorites
router.get('/favorites', authenticate, (req: AuthRequest, res: Response) => {
  const favs = db.prepare(`SELECT i.*, c.name_fr as category_name_fr FROM favorites f JOIN items i ON f.item_id = i.id LEFT JOIN categories c ON i.category_id = c.id WHERE f.user_id = ?`).all(req.user!.id);
  res.json({ favorites: favs.map((i: any) => ({ ...i, photos: typeof i.photos === 'string' ? JSON.parse(i.photos) : i.photos })) });
});

router.post('/favorites/:item_id', authenticate, (req: AuthRequest, res: Response) => {
  const existing = db.prepare('SELECT id FROM favorites WHERE user_id = ? AND item_id = ?').get(req.user!.id, req.params.item_id);
  if (existing) {
    db.prepare('DELETE FROM favorites WHERE user_id = ? AND item_id = ?').run(req.user!.id, req.params.item_id);
    return res.json({ favorited: false });
  }
  db.prepare('INSERT INTO favorites (id, user_id, item_id) VALUES (?, ?, ?)').run(uuidv4(), req.user!.id, req.params.item_id);
  res.json({ favorited: true });
});

// Notifications
router.get('/notifications', authenticate, (req: AuthRequest, res: Response) => {
  const notifs = db.prepare('SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC LIMIT 20').all(req.user!.id);
  res.json({ notifications: notifs });
});

router.put('/notifications/read', authenticate, (req: AuthRequest, res: Response) => {
  db.prepare('UPDATE notifications SET read = 1 WHERE user_id = ?').run(req.user!.id);
  res.json({ success: true });
});

// Chatbot
router.post('/chatbot', (req: Request, res: Response) => {
  const { message } = req.body;
  const lower = (message || '').toLowerCase();

  let response = '';
  if (lower.includes('enchère') || lower.includes('enchere') || lower.includes('bid')) {
    response = 'Pour participer aux enchères, créez un compte gratuit et placez votre offre sur les articles qui vous intéressent. Les enchères se terminent à la date indiquée. Si vous êtes le meilleur enchérisseur, vous serez contacté pour finaliser l\'achat.';
  } else if (lower.includes('livraison') || lower.includes('envoi') || lower.includes('shipping')) {
    response = 'Les frais de livraison sont inclus dans le prix affiché. Une fois votre achat effectué, le vendeur vous contacte via notre messagerie pour organiser l\'envoi ou le retrait.';
  } else if (lower.includes('retour') || lower.includes('remboursement')) {
    response = 'Conformément à nos CGV et au droit européen, vous disposez de 14 jours de rétractation pour les achats à prix fixe. Les achats aux enchères sont définitifs.';
  } else if (lower.includes('paiement') || lower.includes('payment')) {
    response = 'Nous acceptons les principales cartes bancaires (Visa, Mastercard) et PayPal. Tous les paiements sont sécurisés et cryptés.';
  } else if (lower.includes('authenticit') || lower.includes('vrai') || lower.includes('original')) {
    response = 'Tous nos vendeurs professionnels sont vérifiés. Nous recommandons de demander un certificat d\'authenticité pour les pièces de luxe. En cas de doute, contactez-nous.';
  } else if (lower.includes('boutique') || lower.includes('vendre') || lower.includes('pro')) {
    response = 'Pour ouvrir une boutique professionnelle, créez un compte Pro. Sans abonnement, vendez jusqu\'à 10 articles avec 20% de commission. Avec l\'abonnement Premium (129€/mois), articles illimités et seulement 5% de commission.';
  } else if (lower.includes('contact') || lower.includes('aide') || lower.includes('support')) {
    response = 'Notre équipe est disponible par email à contact@magaliberdah.com. Vous pouvez aussi utiliser la messagerie intégrée après votre achat pour communiquer directement avec le vendeur.';
  } else if (lower.includes('marque') || lower.includes('brand') || lower.includes('hermès') || lower.includes('chanel') || lower.includes('dior')) {
    response = 'Nous proposons une sélection exclusive des plus grandes maisons de luxe : Hermès, Chanel, Dior, Louis Vuitton, Gucci, Prada, Cartier, et bien d\'autres. Utilisez le filtre par marque pour trouver vos créateurs préférés.';
  } else {
    response = 'Bonjour ! Je suis l\'assistant Magali Berdah, spécialisé dans la mode et le luxe. Je peux vous aider sur : les enchères, la livraison, les paiements, l\'authentification des articles, ou comment ouvrir une boutique. Que puis-je faire pour vous ?';
  }

  res.json({ response });
});

// File upload helper
router.post('/upload', authenticate, (req: AuthRequest, res: Response) => {
  // placeholder - multer would handle this
  res.json({ url: '/api/placeholder/600/800' });
});

export default router;
