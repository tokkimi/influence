import { Router, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import db from '../database';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = Router();
router.use(authenticate);

// Create order (buy now)
router.post('/', (req: AuthRequest, res: Response) => {
  const { item_id } = req.body;
  const item = db.prepare('SELECT i.*, s.id as shop_id, s.commission_rate FROM items i JOIN shops s ON i.shop_id = s.id WHERE i.id = ? AND i.status = ?').get(item_id, 'active') as any;
  if (!item) return res.status(404).json({ error: 'Article introuvable' });
  if (!item.fixed_price) return res.status(400).json({ error: 'Pas de prix fixe' });

  const id = uuidv4();
  const commission = item.fixed_price * (item.commission_rate / 100);
  const sellerAmount = item.fixed_price - commission;

  db.prepare('INSERT INTO orders (id, item_id, buyer_id, seller_shop_id, amount, commission_rate, commission_amount, seller_amount, type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)').run(
    id, item_id, req.user!.id, item.shop_id, item.fixed_price, item.commission_rate, commission, sellerAmount, 'fixed'
  );
  db.prepare("UPDATE items SET status = 'sold' WHERE id = ?").run(item_id);

  // Notify seller
  const shop = db.prepare('SELECT user_id FROM shops WHERE id = ?').get(item.shop_id) as any;
  if (shop) {
    db.prepare('INSERT INTO notifications (id, user_id, type, title, message, data) VALUES (?, ?, ?, ?, ?, ?)').run(
      uuidv4(), shop.user_id, 'sale', 'Nouvel achat !', `"${item.title}" a été acheté.`, JSON.stringify({ order_id: id })
    );
  }

  const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(id);
  res.json({ order });
});

// Get buyer orders
router.get('/mine', (req: AuthRequest, res: Response) => {
  const orders = db.prepare(`SELECT o.*, i.title as item_title, i.brand, i.photos, s.shop_name, s.user_id as seller_user_id,
    (SELECT COUNT(*) FROM messages WHERE order_id = o.id AND read = 0 AND sender_id != ?) as unread_count
    FROM orders o JOIN items i ON o.item_id = i.id JOIN shops s ON o.seller_shop_id = s.id
    WHERE o.buyer_id = ? ORDER BY o.created_at DESC`).all(req.user!.id, req.user!.id);
  res.json({ orders: orders.map((o: any) => ({ ...o, photos: typeof o.photos === 'string' ? JSON.parse(o.photos) : o.photos })) });
});

// Get shop orders (pro)
router.get('/shop', (req: AuthRequest, res: Response) => {
  const shop = db.prepare('SELECT id FROM shops WHERE user_id = ?').get(req.user!.id) as any;
  if (!shop) return res.status(404).json({ error: 'Boutique introuvable' });
  const orders = db.prepare(`SELECT o.*, i.title as item_title, i.brand, i.photos, u.name as buyer_name, u.email as buyer_email, u.phone as buyer_phone,
    (SELECT COUNT(*) FROM messages WHERE order_id = o.id AND read = 0 AND sender_id != ?) as unread_count
    FROM orders o JOIN items i ON o.item_id = i.id JOIN users u ON o.buyer_id = u.id
    WHERE o.seller_shop_id = ? ORDER BY o.created_at DESC`).all(req.user!.id, shop.id);
  res.json({ orders: orders.map((o: any) => ({ ...o, photos: typeof o.photos === 'string' ? JSON.parse(o.photos) : o.photos })) });
});

// Update shipping status (pro)
router.put('/:id/shipping', (req: AuthRequest, res: Response) => {
  const { status, tracking_number, notes } = req.body;
  const order = db.prepare('SELECT o.*, s.user_id FROM orders o JOIN shops s ON o.seller_shop_id = s.id WHERE o.id = ?').get(req.params.id) as any;
  if (!order) return res.status(404).json({ error: 'Commande introuvable' });
  if (order.user_id !== req.user!.id && req.user!.role !== 'admin') return res.status(403).json({ error: 'Non autorisé' });

  db.prepare("UPDATE orders SET shipping_status = ?, tracking_number = COALESCE(?, tracking_number), notes = COALESCE(?, notes), shipped_at = CASE WHEN ? = 'shipped' THEN datetime('now') ELSE shipped_at END WHERE id = ?").run(status, tracking_number || null, notes || null, status, req.params.id);

  // Notify buyer
  db.prepare('INSERT INTO notifications (id, user_id, type, title, message, data) VALUES (?, ?, ?, ?, ?, ?)').run(
    uuidv4(), order.buyer_id, 'shipping', 'Votre commande a été expédiée !',
    tracking_number ? `Numéro de suivi: ${tracking_number}` : 'Votre commande est en chemin.',
    JSON.stringify({ order_id: req.params.id })
  );

  res.json({ success: true });
});

// Messages
router.get('/:id/messages', (req: AuthRequest, res: Response) => {
  const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(req.params.id) as any;
  if (!order) return res.status(404).json({ error: 'Commande introuvable' });

  const shop = db.prepare('SELECT user_id FROM shops WHERE id = ?').get(order.seller_shop_id) as any;
  if (order.buyer_id !== req.user!.id && shop?.user_id !== req.user!.id && req.user!.role !== 'admin') {
    return res.status(403).json({ error: 'Non autorisé' });
  }

  const messages = db.prepare(`SELECT m.*, u.name as sender_name, u.avatar as sender_avatar FROM messages m JOIN users u ON m.sender_id = u.id WHERE m.order_id = ? ORDER BY m.created_at ASC`).all(req.params.id);
  db.prepare('UPDATE messages SET read = 1 WHERE order_id = ? AND sender_id != ?').run(req.params.id, req.user!.id);
  res.json({ messages });
});

router.post('/:id/messages', (req: AuthRequest, res: Response) => {
  const { content } = req.body;
  const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(req.params.id) as any;
  if (!order) return res.status(404).json({ error: 'Commande introuvable' });

  const shop = db.prepare('SELECT user_id FROM shops WHERE id = ?').get(order.seller_shop_id) as any;
  if (order.buyer_id !== req.user!.id && shop?.user_id !== req.user!.id) return res.status(403).json({ error: 'Non autorisé' });

  const id = uuidv4();
  db.prepare('INSERT INTO messages (id, order_id, sender_id, content) VALUES (?, ?, ?, ?)').run(id, req.params.id, req.user!.id, content);
  const msg = db.prepare('SELECT m.*, u.name as sender_name FROM messages m JOIN users u ON m.sender_id = u.id WHERE m.id = ?').get(id);
  res.json({ message: msg });
});

export default router;
