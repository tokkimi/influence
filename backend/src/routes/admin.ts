import { Router, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import db from '../database';
import { authenticate, requireAdmin, AuthRequest } from '../middleware/auth';

const router = Router();
router.use(authenticate, requireAdmin);

// Dashboard stats
router.get('/stats', (_req, res: Response) => {
  const totalUsers = (db.prepare("SELECT COUNT(*) as c FROM users WHERE role != 'admin'").get() as any).c;
  const totalBuyers = (db.prepare("SELECT COUNT(*) as c FROM users WHERE role = 'buyer'").get() as any).c;
  const totalPros = (db.prepare("SELECT COUNT(*) as c FROM users WHERE role = 'pro'").get() as any).c;
  const totalItems = (db.prepare("SELECT COUNT(*) as c FROM items").get() as any).c;
  const activeItems = (db.prepare("SELECT COUNT(*) as c FROM items WHERE status = 'active'").get() as any).c;
  const totalOrders = (db.prepare("SELECT COUNT(*) as c FROM orders").get() as any).c;
  const pendingPayments = (db.prepare("SELECT COUNT(*) as c FROM orders WHERE payment_status = 'pending'").get() as any).c;
  const totalRevenue = (db.prepare("SELECT COALESCE(SUM(commission_amount), 0) as t FROM orders WHERE payment_status = 'paid'").get() as any).t;
  const activeAuctions = (db.prepare("SELECT COUNT(*) as c FROM items WHERE auction_enabled = 1 AND status = 'active' AND auction_end_time > datetime('now')").get() as any).c;
  const newsletterSubs = (db.prepare("SELECT COUNT(*) as c FROM newsletter_subscribers WHERE active = 1").get() as any).c;
  const todayVisitors = (db.prepare("SELECT COUNT(DISTINCT session_id) as c FROM analytics_visitors WHERE date(created_at) = date('now')").get() as any).c;
  const weekVisitors = (db.prepare("SELECT COUNT(DISTINCT session_id) as c FROM analytics_visitors WHERE created_at > datetime('now', '-7 days')").get() as any).c;

  const topItems = db.prepare('SELECT id, title, brand, views, fixed_price, auction_start_price, status FROM items ORDER BY views DESC LIMIT 10').all();
  const recentOrders = db.prepare(`SELECT o.*, u.name as buyer_name, u.email as buyer_email, s.shop_name, i.title as item_title
    FROM orders o JOIN users u ON o.buyer_id = u.id JOIN shops s ON o.seller_shop_id = s.id JOIN items i ON o.item_id = i.id
    ORDER BY o.created_at DESC LIMIT 10`).all();
  const dailyVisitors = db.prepare("SELECT date(created_at) as day, COUNT(DISTINCT session_id) as count FROM analytics_visitors WHERE created_at > datetime('now', '-30 days') GROUP BY day ORDER BY day").all();

  res.json({ totalUsers, totalBuyers, totalPros, totalItems, activeItems, totalOrders, pendingPayments, totalRevenue, activeAuctions, newsletterSubs, todayVisitors, weekVisitors, topItems, recentOrders, dailyVisitors });
});

// Users management
router.get('/users', (_req, res: Response) => {
  const users = db.prepare(`SELECT u.*, s.shop_name, s.subscription_active, s.total_sales, s.wallet_balance
    FROM users u LEFT JOIN shops s ON u.id = s.user_id ORDER BY u.created_at DESC`).all();
  res.json({ users });
});

router.get('/users/:id', (req: any, res: Response) => {
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.params.id) as any;
  if (!user) return res.status(404).json({ error: 'Utilisateur introuvable' });
  const { password_hash, ...safe } = user;
  const shop = db.prepare('SELECT * FROM shops WHERE user_id = ?').get(req.params.id);
  const orders = db.prepare(`SELECT o.*, i.title as item_title FROM orders o JOIN items i ON o.item_id = i.id WHERE o.buyer_id = ? ORDER BY o.created_at DESC`).all(req.params.id);
  const bids = db.prepare(`SELECT b.*, i.title as item_title, i.auction_end_time FROM bids b JOIN items i ON b.item_id = i.id WHERE b.user_id = ? ORDER BY b.created_at DESC`).all(req.params.id);
  res.json({ user: safe, shop, orders, bids });
});

router.put('/users/:id/verify', (req: any, res: Response) => {
  db.prepare('UPDATE users SET verified = ? WHERE id = ?').run(req.body.verified ? 1 : 0, req.params.id);
  res.json({ success: true });
});

router.put('/users/:id/ban', (req: any, res: Response) => {
  db.prepare('UPDATE users SET banned = ? WHERE id = ?').run(req.body.banned ? 1 : 0, req.params.id);
  res.json({ success: true });
});

router.delete('/users/:id', (req: any, res: Response) => {
  db.prepare('DELETE FROM users WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

// Items management
router.get('/items', (_req, res: Response) => {
  const items = db.prepare(`SELECT i.*, s.shop_name, c.name_fr as category_name_fr,
    (SELECT COUNT(*) FROM bids WHERE item_id = i.id) as bid_count
    FROM items i LEFT JOIN shops s ON i.shop_id = s.id LEFT JOIN categories c ON i.category_id = c.id
    ORDER BY i.created_at DESC`).all();
  res.json({ items: items.map((i: any) => ({ ...i, photos: typeof i.photos === 'string' ? JSON.parse(i.photos) : i.photos })) });
});

router.put('/items/:id/status', (req: any, res: Response) => {
  const { status } = req.body;
  if (!['active', 'suspended', 'draft', 'removed'].includes(status)) return res.status(400).json({ error: 'Statut invalide' });
  db.prepare("UPDATE items SET status = ?, updated_at = datetime('now') WHERE id = ?").run(status, req.params.id);
  res.json({ success: true });
});

router.put('/items/:id/feature', (req: any, res: Response) => {
  db.prepare('UPDATE items SET featured = ? WHERE id = ?').run(req.body.featured ? 1 : 0, req.params.id);
  res.json({ success: true });
});

router.delete('/items/:id', (req: any, res: Response) => {
  db.prepare("UPDATE items SET status = 'removed' WHERE id = ?").run(req.params.id);
  res.json({ success: true });
});

// Orders management
router.get('/orders', (_req, res: Response) => {
  const orders = db.prepare(`SELECT o.*, u.name as buyer_name, u.email as buyer_email, s.shop_name, i.title as item_title
    FROM orders o JOIN users u ON o.buyer_id = u.id JOIN shops s ON o.seller_shop_id = s.id JOIN items i ON o.item_id = i.id
    ORDER BY o.created_at DESC`).all();
  res.json({ orders });
});

router.put('/orders/:id/payment', (req: any, res: Response) => {
  const { status } = req.body;
  db.prepare("UPDATE orders SET payment_status = ?, paid_at = CASE WHEN ? = 'paid' THEN datetime('now') ELSE paid_at END WHERE id = ?").run(status, status, req.params.id);
  res.json({ success: true });
});

// Shops management
router.get('/shops', (_req, res: Response) => {
  const shops = db.prepare(`SELECT s.*, u.email, u.name as owner_name, u.verified,
    (SELECT COUNT(*) FROM items WHERE shop_id = s.id) as item_count,
    (SELECT COUNT(*) FROM orders WHERE seller_shop_id = s.id) as order_count
    FROM shops s JOIN users u ON s.user_id = u.id ORDER BY s.created_at DESC`).all();
  res.json({ shops });
});

router.put('/shops/:id/subscription', (req: any, res: Response) => {
  const { active } = req.body;
  const end = active ? new Date(Date.now() + 30 * 86400000).toISOString() : null;
  db.prepare('UPDATE shops SET subscription_active = ?, subscription_end = ?, commission_rate = ? WHERE id = ?').run(active ? 1 : 0, end, active ? 5 : 20, req.params.id);
  res.json({ success: true });
});

// Newsletter
router.get('/newsletter/subscribers', (_req, res: Response) => {
  const subs = db.prepare('SELECT * FROM newsletter_subscribers ORDER BY created_at DESC').all();
  res.json({ subscribers: subs });
});

router.get('/newsletter/campaigns', (_req, res: Response) => {
  const campaigns = db.prepare('SELECT * FROM email_campaigns ORDER BY created_at DESC').all();
  res.json({ campaigns });
});

router.post('/newsletter/campaigns', (req: any, res: Response) => {
  const { subject, content, target_categories } = req.body;
  const id = uuidv4();
  db.prepare('INSERT INTO email_campaigns (id, subject, content, target_categories) VALUES (?, ?, ?, ?)').run(id, subject, content, JSON.stringify(target_categories || []));
  res.json({ id, success: true });
});

router.post('/newsletter/campaigns/:id/send', (req: any, res: Response) => {
  const campaign = db.prepare('SELECT * FROM email_campaigns WHERE id = ?').get(req.params.id) as any;
  if (!campaign) return res.status(404).json({ error: 'Campagne introuvable' });
  const cats = JSON.parse(campaign.target_categories || '[]');
  let subs;
  if (cats.length === 0) {
    subs = db.prepare('SELECT * FROM newsletter_subscribers WHERE active = 1').all() as any[];
  } else {
    subs = db.prepare('SELECT * FROM newsletter_subscribers WHERE active = 1').all() as any[];
    subs = subs.filter((s: any) => {
      const sCats = JSON.parse(s.categories || '[]');
      return cats.some((c: string) => sCats.includes(c));
    });
  }
  db.prepare("UPDATE email_campaigns SET status = 'sent', sent_count = ?, sent_at = datetime('now') WHERE id = ?").run(subs.length, req.params.id);
  res.json({ success: true, sent: subs.length });
});

// SEO
router.get('/seo', (_req, res: Response) => {
  const seo = db.prepare("SELECT * FROM seo_settings WHERE id = 'global'").get();
  res.json({ seo });
});

router.put('/seo', (req: any, res: Response) => {
  const { site_title, site_description, site_keywords, og_image, google_analytics } = req.body;
  db.prepare("UPDATE seo_settings SET site_title=?, site_description=?, site_keywords=?, og_image=?, google_analytics=?, updated_at=datetime('now') WHERE id='global'").run(site_title, site_description, site_keywords, og_image, google_analytics);
  res.json({ success: true });
});

// Analytics
router.get('/analytics/visitors', (_req, res: Response) => {
  const daily = db.prepare("SELECT date(created_at) as day, COUNT(DISTINCT session_id) as unique_visitors, COUNT(*) as page_views FROM analytics_visitors WHERE created_at > datetime('now', '-30 days') GROUP BY day ORDER BY day").all();
  const topPages = db.prepare("SELECT page, COUNT(*) as views FROM analytics_visitors WHERE created_at > datetime('now', '-30 days') GROUP BY page ORDER BY views DESC LIMIT 20").all();
  const countries = db.prepare("SELECT country, COUNT(*) as count FROM analytics_visitors WHERE created_at > datetime('now', '-30 days') GROUP BY country ORDER BY count DESC LIMIT 10").all();
  res.json({ daily, topPages, countries });
});

router.get('/analytics/items', (_req, res: Response) => {
  const topViewed = db.prepare('SELECT i.id, i.title, i.brand, i.views, i.status, i.fixed_price, i.auction_start_price FROM items i ORDER BY i.views DESC LIMIT 20').all();
  const topBid = db.prepare(`SELECT i.id, i.title, i.brand, COUNT(b.id) as bid_count, MAX(b.amount) as max_bid FROM items i LEFT JOIN bids b ON i.id = b.item_id GROUP BY i.id ORDER BY bid_count DESC LIMIT 10`).all();
  const byCategory = db.prepare(`SELECT c.name_fr, COUNT(i.id) as count, COALESCE(SUM(i.views), 0) as total_views FROM categories c LEFT JOIN items i ON i.category_id = c.id WHERE c.parent_id IS NULL GROUP BY c.id ORDER BY total_views DESC`).all();
  res.json({ topViewed, topBid, byCategory });
});

export default router;
