import { Router, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import db from '../database';
import { authenticate, requirePro, AuthRequest } from '../middleware/auth';

const router = Router();

// Public shop profile
router.get('/:id', (req: any, res: Response) => {
  const shop = db.prepare('SELECT s.*, u.name as owner_name, u.verified FROM shops s JOIN users u ON s.user_id = u.id WHERE s.id = ?').get(req.params.id) as any;
  if (!shop) return res.status(404).json({ error: 'Boutique introuvable' });
  const items = db.prepare("SELECT * FROM items WHERE shop_id = ? AND status = 'active' ORDER BY created_at DESC").all(req.params.id);
  res.json({ shop, items: items.map((i: any) => ({ ...i, photos: typeof i.photos === 'string' ? JSON.parse(i.photos) : i.photos })) });
});

// Pro: update own shop
router.put('/me/profile', authenticate, requirePro, (req: AuthRequest, res: Response) => {
  const shop = db.prepare('SELECT * FROM shops WHERE user_id = ?').get(req.user!.id) as any;
  if (!shop) return res.status(404).json({ error: 'Boutique introuvable' });
  const { shop_name, description, website } = req.body;
  db.prepare('UPDATE shops SET shop_name = ?, description = ?, website = ? WHERE id = ?').run(shop_name, description, website, shop.id);
  res.json({ success: true, shop: db.prepare('SELECT * FROM shops WHERE id = ?').get(shop.id) });
});

// Pro: get dashboard stats
router.get('/me/stats', authenticate, requirePro, (req: AuthRequest, res: Response) => {
  const shop = db.prepare('SELECT * FROM shops WHERE user_id = ?').get(req.user!.id) as any;
  if (!shop) return res.status(404).json({ error: 'Boutique introuvable' });

  const totalItems = (db.prepare("SELECT COUNT(*) as c FROM items WHERE shop_id = ?").get(shop.id) as any).c;
  const activeItems = (db.prepare("SELECT COUNT(*) as c FROM items WHERE shop_id = ? AND status = 'active'").get(shop.id) as any).c;
  const totalOrders = (db.prepare("SELECT COUNT(*) as c FROM orders WHERE seller_shop_id = ?").get(shop.id) as any).c;
  const pendingOrders = (db.prepare("SELECT COUNT(*) as c FROM orders WHERE seller_shop_id = ? AND payment_status = 'pending'").get(shop.id) as any).c;
  const totalRevenue = (db.prepare("SELECT COALESCE(SUM(seller_amount), 0) as t FROM orders WHERE seller_shop_id = ? AND payment_status = 'paid'").get(shop.id) as any).t;
  const activeAuctions = (db.prepare("SELECT COUNT(*) as c FROM items WHERE shop_id = ? AND auction_enabled = 1 AND status = 'active' AND auction_end_time > datetime('now')").get(shop.id) as any).c;

  res.json({ shop, totalItems, activeItems, totalOrders, pendingOrders, totalRevenue, activeAuctions });
});

// Pro: subscribe
router.post('/me/subscribe', authenticate, requirePro, (req: AuthRequest, res: Response) => {
  const shop = db.prepare('SELECT * FROM shops WHERE user_id = ?').get(req.user!.id) as any;
  if (!shop) return res.status(404).json({ error: 'Boutique introuvable' });
  const end = new Date(Date.now() + 30 * 86400000).toISOString();
  db.prepare("UPDATE shops SET subscription_active = 1, subscription_start = datetime('now'), subscription_end = ?, commission_rate = 5 WHERE id = ?").run(end, shop.id);
  res.json({ success: true, message: 'Abonnement activé (simulation paiement)' });
});

// Wallet
router.get('/me/wallet', authenticate, requirePro, (req: AuthRequest, res: Response) => {
  const shop = db.prepare('SELECT id, wallet_balance, total_sales FROM shops WHERE user_id = ?').get(req.user!.id) as any;
  if (!shop) return res.status(404).json({ error: 'Boutique introuvable' });
  const transactions = db.prepare(`SELECT o.*, i.title as item_title FROM orders o JOIN items i ON o.item_id = i.id WHERE o.seller_shop_id = ? ORDER BY o.created_at DESC LIMIT 50`).all(shop.id);
  res.json({ wallet_balance: shop.wallet_balance, total_sales: shop.total_sales, transactions });
});

export default router;
