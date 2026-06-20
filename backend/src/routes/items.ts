import { Router, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import db from '../database';
import { authenticate, requirePro, requireAdmin, AuthRequest } from '../middleware/auth';

const router = Router();

// Public: list items
router.get('/', (req: any, res: Response) => {
  const { category, brand, search, type, featured, limit = 20, offset = 0, sort = 'created_at' } = req.query;
  let query = `SELECT i.*, s.shop_name, s.avatar as shop_avatar,
    c.name_fr as category_name_fr, c.name_en as category_name_en
    FROM items i
    LEFT JOIN shops s ON i.shop_id = s.id
    LEFT JOIN categories c ON i.category_id = c.id
    WHERE i.status = 'active'`;
  const params: any[] = [];

  if (category) { query += ' AND (i.category_id = ? OR c.parent_id = ?)'; params.push(category, category); }
  if (brand) { query += ' AND i.brand LIKE ?'; params.push(`%${brand}%`); }
  if (search) { query += ' AND (i.title LIKE ? OR i.brand LIKE ? OR i.description LIKE ?)'; params.push(`%${search}%`, `%${search}%`, `%${search}%`); }
  if (type === 'auction') query += ' AND i.auction_enabled = 1';
  if (type === 'fixed') query += ' AND i.fixed_price IS NOT NULL';
  if (featured === 'true') query += ' AND i.featured = 1';

  const validSorts: Record<string, string> = {
    created_at: 'i.created_at DESC',
    price_asc: 'COALESCE(i.fixed_price, i.auction_start_price) ASC',
    price_desc: 'COALESCE(i.fixed_price, i.auction_start_price) DESC',
    views: 'i.views DESC',
    ending: 'i.auction_end_time ASC',
  };
  query += ` ORDER BY i.featured DESC, ${validSorts[sort as string] || 'i.created_at DESC'}`;
  query += ' LIMIT ? OFFSET ?';
  params.push(Number(limit), Number(offset));

  const items = db.prepare(query).all(...params);
  const total = db.prepare(`SELECT COUNT(*) as c FROM items i LEFT JOIN categories c ON i.category_id = c.id WHERE i.status = 'active'${category ? ' AND (i.category_id = ? OR c.parent_id = ?)' : ''}${brand ? ' AND i.brand LIKE ?' : ''}${search ? ' AND (i.title LIKE ? OR i.brand LIKE ? OR i.description LIKE ?)' : ''}${type === 'auction' ? ' AND i.auction_enabled = 1' : ''}${type === 'fixed' ? ' AND i.fixed_price IS NOT NULL' : ''}${featured === 'true' ? ' AND i.featured = 1' : ''}`).get(...params.slice(0, -2)) as any;

  res.json({ items: items.map(parseItem), total: total.c });
});

// Public: single item
router.get('/:id', (req: any, res: Response) => {
  const item = db.prepare(`SELECT i.*, s.shop_name, s.avatar as shop_avatar, s.description as shop_description,
    c.name_fr as category_name_fr, c.name_en as category_name_en
    FROM items i LEFT JOIN shops s ON i.shop_id = s.id LEFT JOIN categories c ON i.category_id = c.id
    WHERE i.id = ?`).get(req.params.id) as any;
  if (!item) return res.status(404).json({ error: 'Article introuvable' });

  // Increment views
  db.prepare('UPDATE items SET views = views + 1 WHERE id = ?').run(req.params.id);
  db.prepare('INSERT INTO analytics_item_views (id, item_id, session_id) VALUES (?, ?, ?)').run(uuidv4(), req.params.id, req.headers['x-session-id'] || 'anonymous');

  const bids = db.prepare(`SELECT b.*, u.name as bidder_name FROM bids b JOIN users u ON b.user_id = u.id WHERE b.item_id = ? ORDER BY b.amount DESC LIMIT 10`).all(req.params.id);
  res.json({ item: parseItem(item), bids });
});

// Pro: create item
router.post('/', authenticate, requirePro, (req: AuthRequest, res: Response) => {
  const shop = db.prepare('SELECT * FROM shops WHERE user_id = ?').get(req.user!.id) as any;
  if (!shop) return res.status(404).json({ error: 'Boutique introuvable' });

  if (!shop.subscription_active) {
    const count = db.prepare("SELECT COUNT(*) as c FROM items WHERE shop_id = ? AND status != 'removed'").get(shop.id) as any;
    if (count.c >= 10) return res.status(403).json({ error: 'Limite de 10 articles atteinte. Abonnez-vous pour des articles illimités.' });
  }

  const id = uuidv4();
  const { title, description, brand, category_id, condition, size, color, material, photos = [], fixed_price, auction_enabled, auction_start_price, auction_min_price, auction_end_time, seo_title, seo_description, seo_keywords } = req.body;

  db.prepare(`INSERT INTO items (id, shop_id, title, description, brand, category_id, condition, size, color, material, photos, fixed_price, auction_enabled, auction_start_price, auction_min_price, auction_end_time, seo_title, seo_description, seo_keywords)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).run(
    id, shop.id, title, description, brand, category_id, condition, size, color, material,
    JSON.stringify(photos), fixed_price || null, auction_enabled ? 1 : 0,
    auction_start_price || null, auction_min_price || null, auction_end_time || null,
    seo_title || null, seo_description || null, seo_keywords || null
  );

  const item = db.prepare('SELECT * FROM items WHERE id = ?').get(id);
  res.json({ item: parseItem(item) });
});

// Pro: update item
router.put('/:id', authenticate, (req: AuthRequest, res: Response) => {
  const item = db.prepare('SELECT i.*, s.user_id FROM items i JOIN shops s ON i.shop_id = s.id WHERE i.id = ?').get(req.params.id) as any;
  if (!item) return res.status(404).json({ error: 'Article introuvable' });
  if (item.user_id !== req.user!.id && req.user!.role !== 'admin') return res.status(403).json({ error: 'Non autorisé' });

  const { title, description, brand, category_id, condition, size, color, material, photos, fixed_price, auction_enabled, auction_start_price, auction_min_price, auction_end_time, status, featured, seo_title, seo_description, seo_keywords } = req.body;

  db.prepare(`UPDATE items SET title=?, description=?, brand=?, category_id=?, condition=?, size=?, color=?, material=?, photos=?,
    fixed_price=?, auction_enabled=?, auction_start_price=?, auction_min_price=?, auction_end_time=?,
    status=COALESCE(?, status), featured=COALESCE(?, featured),
    seo_title=?, seo_description=?, seo_keywords=?, updated_at=datetime('now') WHERE id=?`).run(
    title, description, brand, category_id, condition, size, color, material,
    photos ? JSON.stringify(photos) : item.photos,
    fixed_price ?? null, auction_enabled !== undefined ? (auction_enabled ? 1 : 0) : item.auction_enabled,
    auction_start_price ?? null, auction_min_price ?? null, auction_end_time ?? null,
    status ?? null, featured !== undefined ? (featured ? 1 : 0) : null,
    seo_title ?? null, seo_description ?? null, seo_keywords ?? null,
    req.params.id
  );

  res.json({ item: parseItem(db.prepare('SELECT * FROM items WHERE id = ?').get(req.params.id)) });
});

// Public: place bid
router.post('/:id/bid', authenticate, (req: AuthRequest, res: Response) => {
  const { amount } = req.body;
  const item = db.prepare('SELECT * FROM items WHERE id = ? AND status = ? AND auction_enabled = 1').get(req.params.id, 'active') as any;
  if (!item) return res.status(404).json({ error: 'Enchère introuvable' });
  if (new Date(item.auction_end_time) < new Date()) return res.status(400).json({ error: 'Enchère terminée' });

  const minBid = (item.current_bid || item.auction_start_price) + 1;
  if (amount < minBid) return res.status(400).json({ error: `Enchère minimum: ${minBid}€` });

  const bidId = uuidv4();
  db.prepare('INSERT INTO bids (id, item_id, user_id, amount) VALUES (?, ?, ?, ?)').run(bidId, item.id, req.user!.id, amount);
  db.prepare('UPDATE items SET current_bid = ?, current_bid_user_id = ? WHERE id = ?').run(amount, req.user!.id, item.id);

  // Notify previous bidder
  if (item.current_bid_user_id && item.current_bid_user_id !== req.user!.id) {
    db.prepare('INSERT INTO notifications (id, user_id, type, title, message, data) VALUES (?, ?, ?, ?, ?, ?)').run(
      uuidv4(), item.current_bid_user_id, 'outbid', 'Vous avez été surenchéri !',
      `Une nouvelle offre a été placée sur "${item.title}"`, JSON.stringify({ item_id: item.id })
    );
  }

  res.json({ success: true, newBid: amount });
});

// Pro: get own items
router.get('/shop/mine', authenticate, requirePro, (req: AuthRequest, res: Response) => {
  const shop = db.prepare('SELECT id FROM shops WHERE user_id = ?').get(req.user!.id) as any;
  if (!shop) return res.status(404).json({ error: 'Boutique introuvable' });
  const items = db.prepare('SELECT i.*, c.name_fr as category_name_fr FROM items i LEFT JOIN categories c ON i.category_id = c.id WHERE i.shop_id = ? ORDER BY i.created_at DESC').all(shop.id);
  res.json({ items: items.map(parseItem) });
});

function parseItem(item: any) {
  if (!item) return null;
  return { ...item, photos: typeof item.photos === 'string' ? JSON.parse(item.photos) : item.photos };
}

export default router;
