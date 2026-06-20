import Database from 'better-sqlite3';
import path from 'path';
import bcrypt from 'bcryptjs';

const DB_PATH = process.env.DATABASE_PATH ||
  (process.env.VERCEL ? '/tmp/magali.db' : path.join(__dirname, '../../data/magali.db'));

import fs from 'fs';
fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });

const db = new Database(DB_PATH);

db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    name TEXT NOT NULL,
    role TEXT DEFAULT 'buyer',
    avatar TEXT,
    phone TEXT,
    address TEXT,
    city TEXT,
    country TEXT DEFAULT 'FR',
    verified INTEGER DEFAULT 0,
    banned INTEGER DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now')),
    last_login TEXT
  );

  CREATE TABLE IF NOT EXISTS shops (
    id TEXT PRIMARY KEY,
    user_id TEXT UNIQUE NOT NULL,
    shop_name TEXT NOT NULL,
    description TEXT,
    banner TEXT,
    avatar TEXT,
    siret TEXT,
    website TEXT,
    subscription_active INTEGER DEFAULT 0,
    subscription_start TEXT,
    subscription_end TEXT,
    commission_rate REAL DEFAULT 20,
    total_sales REAL DEFAULT 0,
    wallet_balance REAL DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS categories (
    id TEXT PRIMARY KEY,
    name_fr TEXT NOT NULL,
    name_en TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    parent_id TEXT,
    icon TEXT,
    sort_order INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS items (
    id TEXT PRIMARY KEY,
    shop_id TEXT,
    title TEXT NOT NULL,
    description TEXT,
    brand TEXT,
    category_id TEXT,
    condition TEXT DEFAULT 'very_good',
    size TEXT,
    color TEXT,
    material TEXT,
    photos TEXT DEFAULT '[]',
    fixed_price REAL,
    auction_enabled INTEGER DEFAULT 0,
    auction_start_price REAL,
    auction_min_price REAL,
    auction_end_time TEXT,
    current_bid REAL,
    current_bid_user_id TEXT,
    status TEXT DEFAULT 'draft',
    featured INTEGER DEFAULT 0,
    views INTEGER DEFAULT 0,
    seo_title TEXT,
    seo_description TEXT,
    seo_keywords TEXT,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (shop_id) REFERENCES shops(id),
    FOREIGN KEY (category_id) REFERENCES categories(id)
  );

  CREATE TABLE IF NOT EXISTS bids (
    id TEXT PRIMARY KEY,
    item_id TEXT NOT NULL,
    user_id TEXT NOT NULL,
    amount REAL NOT NULL,
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (item_id) REFERENCES items(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY,
    item_id TEXT NOT NULL,
    buyer_id TEXT NOT NULL,
    seller_shop_id TEXT NOT NULL,
    amount REAL NOT NULL,
    commission_rate REAL DEFAULT 20,
    commission_amount REAL,
    seller_amount REAL,
    type TEXT DEFAULT 'fixed',
    payment_status TEXT DEFAULT 'pending',
    shipping_status TEXT DEFAULT 'pending',
    tracking_number TEXT,
    notes TEXT,
    created_at TEXT DEFAULT (datetime('now')),
    paid_at TEXT,
    shipped_at TEXT,
    delivered_at TEXT,
    FOREIGN KEY (item_id) REFERENCES items(id),
    FOREIGN KEY (buyer_id) REFERENCES users(id),
    FOREIGN KEY (seller_shop_id) REFERENCES shops(id)
  );

  CREATE TABLE IF NOT EXISTS messages (
    id TEXT PRIMARY KEY,
    order_id TEXT NOT NULL,
    sender_id TEXT NOT NULL,
    content TEXT NOT NULL,
    read INTEGER DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (sender_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    categories TEXT DEFAULT '[]',
    active INTEGER DEFAULT 1,
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS email_campaigns (
    id TEXT PRIMARY KEY,
    subject TEXT NOT NULL,
    content TEXT NOT NULL,
    target_categories TEXT DEFAULT '[]',
    status TEXT DEFAULT 'draft',
    sent_count INTEGER DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now')),
    sent_at TEXT
  );

  CREATE TABLE IF NOT EXISTS analytics_visitors (
    id TEXT PRIMARY KEY,
    session_id TEXT,
    ip TEXT,
    country TEXT,
    user_agent TEXT,
    page TEXT,
    referrer TEXT,
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS analytics_item_views (
    id TEXT PRIMARY KEY,
    item_id TEXT,
    session_id TEXT,
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS seo_settings (
    id TEXT PRIMARY KEY DEFAULT 'global',
    site_title TEXT,
    site_description TEXT,
    site_keywords TEXT,
    og_image TEXT,
    google_analytics TEXT,
    updated_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS favorites (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    item_id TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (item_id) REFERENCES items(id)
  );

  CREATE TABLE IF NOT EXISTS notifications (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    type TEXT NOT NULL,
    title TEXT NOT NULL,
    message TEXT,
    read INTEGER DEFAULT 0,
    data TEXT,
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES users(id)
  );
`);

// Seed categories
const catCount = db.prepare('SELECT COUNT(*) as c FROM categories').get() as any;
if (catCount.c === 0) {
  const cats = [
    { id: 'women', name_fr: 'Femme', name_en: 'Women', slug: 'femme', parent_id: null, sort_order: 1 },
    { id: 'men', name_fr: 'Homme', name_en: 'Men', slug: 'homme', parent_id: null, sort_order: 2 },
    { id: 'bags', name_fr: 'Sacs', name_en: 'Bags', slug: 'sacs', parent_id: null, sort_order: 3 },
    { id: 'accessories', name_fr: 'Accessoires', name_en: 'Accessories', slug: 'accessoires', parent_id: null, sort_order: 4 },
    // Women sub
    { id: 'women-dresses', name_fr: 'Robes', name_en: 'Dresses', slug: 'femme-robes', parent_id: 'women', sort_order: 1 },
    { id: 'women-tops', name_fr: 'Hauts & Tops', name_en: 'Tops', slug: 'femme-hauts', parent_id: 'women', sort_order: 2 },
    { id: 'women-pants', name_fr: 'Pantalons & Jeans', name_en: 'Pants & Jeans', slug: 'femme-pantalons', parent_id: 'women', sort_order: 3 },
    { id: 'women-skirts', name_fr: 'Jupes', name_en: 'Skirts', slug: 'femme-jupes', parent_id: 'women', sort_order: 4 },
    { id: 'women-coats', name_fr: 'Manteaux & Vestes', name_en: 'Coats & Jackets', slug: 'femme-manteaux', parent_id: 'women', sort_order: 5 },
    { id: 'women-shoes', name_fr: 'Chaussures', name_en: 'Shoes', slug: 'femme-chaussures', parent_id: 'women', sort_order: 6 },
    { id: 'women-lingerie', name_fr: 'Lingerie', name_en: 'Lingerie', slug: 'femme-lingerie', parent_id: 'women', sort_order: 7 },
    // Men sub
    { id: 'men-shirts', name_fr: 'Chemises & Polos', name_en: 'Shirts & Polos', slug: 'homme-chemises', parent_id: 'men', sort_order: 1 },
    { id: 'men-pants', name_fr: 'Pantalons & Jeans', name_en: 'Pants & Jeans', slug: 'homme-pantalons', parent_id: 'men', sort_order: 2 },
    { id: 'men-suits', name_fr: 'Costumes & Blazers', name_en: 'Suits & Blazers', slug: 'homme-costumes', parent_id: 'men', sort_order: 3 },
    { id: 'men-coats', name_fr: 'Manteaux & Vestes', name_en: 'Coats & Jackets', slug: 'homme-manteaux', parent_id: 'men', sort_order: 4 },
    { id: 'men-shoes', name_fr: 'Chaussures', name_en: 'Shoes', slug: 'homme-chaussures', parent_id: 'men', sort_order: 5 },
    // Bags sub
    { id: 'bags-handbags', name_fr: 'Sacs à Main', name_en: 'Handbags', slug: 'sacs-main', parent_id: 'bags', sort_order: 1 },
    { id: 'bags-shoulder', name_fr: 'Sacs Bandoulière', name_en: 'Shoulder Bags', slug: 'sacs-bandouliere', parent_id: 'bags', sort_order: 2 },
    { id: 'bags-clutch', name_fr: 'Pochettes', name_en: 'Clutches', slug: 'sacs-pochettes', parent_id: 'bags', sort_order: 3 },
    { id: 'bags-backpack', name_fr: 'Sacs à Dos', name_en: 'Backpacks', slug: 'sacs-dos', parent_id: 'bags', sort_order: 4 },
    { id: 'bags-travel', name_fr: 'Bagages', name_en: 'Luggage', slug: 'sacs-bagages', parent_id: 'bags', sort_order: 5 },
    // Accessories sub
    { id: 'acc-jewelry', name_fr: 'Bijoux', name_en: 'Jewelry', slug: 'acc-bijoux', parent_id: 'accessories', sort_order: 1 },
    { id: 'acc-watches', name_fr: 'Montres', name_en: 'Watches', slug: 'acc-montres', parent_id: 'accessories', sort_order: 2 },
    { id: 'acc-belts', name_fr: 'Ceintures', name_en: 'Belts', slug: 'acc-ceintures', parent_id: 'accessories', sort_order: 3 },
    { id: 'acc-scarves', name_fr: 'Écharpes & Foulards', name_en: 'Scarves', slug: 'acc-foulards', parent_id: 'accessories', sort_order: 4 },
    { id: 'acc-sunglasses', name_fr: 'Lunettes', name_en: 'Sunglasses', slug: 'acc-lunettes', parent_id: 'accessories', sort_order: 5 },
  ];
  const insertCat = db.prepare('INSERT INTO categories (id, name_fr, name_en, slug, parent_id, sort_order) VALUES (?, ?, ?, ?, ?, ?)');
  for (const c of cats) db.prepare('INSERT OR IGNORE INTO categories (id, name_fr, name_en, slug, parent_id, sort_order) VALUES (?, ?, ?, ?, ?, ?)').run(c.id, c.name_fr, c.name_en, c.slug, c.parent_id, c.sort_order);
}

// Seed default admin + test users
const userCount = db.prepare('SELECT COUNT(*) as c FROM users').get() as any;
if (userCount.c === 0) {
  const { v4: uuidv4 } = require('uuid');
  const adminHash = bcrypt.hashSync('Admin2024!', 10);
  const buyerHash = bcrypt.hashSync('Buyer2024!', 10);
  const proHash = bcrypt.hashSync('Shop2024!', 10);

  const adminId = uuidv4();
  const buyerId = uuidv4();
  const proId = uuidv4();
  const shopId = uuidv4();

  db.prepare('INSERT INTO users (id, email, password_hash, name, role, verified) VALUES (?, ?, ?, ?, ?, ?)').run(adminId, 'admin@magaliberdah.com', adminHash, 'Magali Berdah', 'admin', 1);
  db.prepare('INSERT INTO users (id, email, password_hash, name, role, verified) VALUES (?, ?, ?, ?, ?, ?)').run(buyerId, 'acheteur@test.com', buyerHash, 'Sophie Martin', 'buyer', 1);
  db.prepare('INSERT INTO users (id, email, password_hash, name, role, verified) VALUES (?, ?, ?, ?, ?, ?)').run(proId, 'boutique@test.com', proHash, 'Élise Dupont', 'pro', 1);

  db.prepare('INSERT INTO shops (id, user_id, shop_name, description, siret, subscription_active, subscription_start, subscription_end, commission_rate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)').run(
    shopId, proId, 'La Boutique Élise', 'Sélection exclusive de pièces de luxe vintage et contemporaines.', '12345678901234',
    1, new Date().toISOString(), new Date(Date.now() + 30 * 86400000).toISOString(), 5
  );

  // Sample items — 5 enchères + 5 ventes
  const now = new Date();
  const in2days = new Date(now.getTime() + 2 * 86400000).toISOString();
  const in4days = new Date(now.getTime() + 4 * 86400000).toISOString();
  const in5days = new Date(now.getTime() + 5 * 86400000).toISOString();
  const in7days = new Date(now.getTime() + 7 * 86400000).toISOString();
  const in10days = new Date(now.getTime() + 10 * 86400000).toISOString();
  const p = (w: number, h: number) => JSON.stringify([`/api/placeholder/${w}/${h}`]);

  const insertAuction = db.prepare('INSERT INTO items (id, shop_id, title, description, brand, category_id, condition, size, color, photos, fixed_price, auction_enabled, auction_start_price, auction_min_price, auction_end_time, status, featured) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
  const insertFixed  = db.prepare('INSERT INTO items (id, shop_id, title, description, brand, category_id, condition, size, color, photos, fixed_price, auction_enabled, status, featured) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');

  // 5 enchères
  insertAuction.run(uuidv4(), shopId, 'Sac Birkin 30 Hermès Fauve', 'Birkin 30 cuir Togo fauve, état exceptionnel, boîte et dustbag inclus.', 'Hermès', 'bags-handbags', 'excellent', 'Taille unique', 'Fauve', p(600,800), null, 1, 8500, 7000, in2days, 'active', 1);
  insertAuction.run(uuidv4(), shopId, 'Montre Cartier Tank Must', 'Tank Must acier, bracelet cuir bordeaux, avec boîte et papiers.', 'Cartier', 'acc-watches', 'excellent', 'Taille unique', 'Argent', p(600,800), null, 1, 1800, 1500, in4days, 'active', 1);
  insertAuction.run(uuidv4(), shopId, 'Veste Gucci Brodée Fleurs', 'Veste Gucci en laine brodée fleurs, collection Alessandro Michele, état neuf.', 'Gucci', 'women-coats', 'excellent', '40', 'Noir', p(600,800), null, 1, 2200, 1800, in5days, 'active', 1);
  insertAuction.run(uuidv4(), shopId, 'Sac Kelly 28 Hermès Noir', 'Kelly 28 box calf noir, palladium, intérieur impeccable, avec accessoires.', 'Hermès', 'bags-handbags', 'very_good', 'Taille unique', 'Noir', p(600,800), null, 1, 11000, 9500, in7days, 'active', 1);
  insertAuction.run(uuidv4(), shopId, 'Collier Perles Chanel Vintage', 'Collier de perles Chanel vintage double rang avec fermoir CC doré, très bon état.', 'Chanel', 'acc-jewelry', 'very_good', 'Taille unique', 'Blanc', p(600,800), null, 1, 950, 750, in10days, 'active', 0);

  // 5 ventes directes
  insertFixed.run(uuidv4(), shopId, 'Robe Chanel Tweed Rose', 'Robe tweed rose poudré Chanel, collection printemps-été, parfait état.', 'Chanel', 'women-dresses', 'excellent', '38', 'Rose', p(600,800), 3200, 0, 'active', 1);
  insertFixed.run(uuidv4(), shopId, 'Manteau Max Mara Camel', 'Iconique manteau Max Mara en camel, coupe structurée, très bon état.', 'Max Mara', 'women-coats', 'very_good', '40', 'Camel', p(600,800), 850, 0, 'active', 1);
  insertFixed.run(uuidv4(), shopId, 'Costume Berluti Gris Anthracite', 'Costume deux pièces Berluti, laine gris anthracite, coupe slim, taille 50.', 'Berluti', 'men-suits', 'excellent', '50', 'Gris', p(600,800), 1600, 0, 'active', 0);
  insertFixed.run(uuidv4(), shopId, 'Sac Pochette Dior Saddle', 'Mini Saddle bag Dior en cuir noir, bandoulière, état excellent avec pochon.', 'Dior', 'bags-clutch', 'excellent', 'Taille unique', 'Noir', p(600,800), 1250, 0, 'active', 1);
  insertFixed.run(uuidv4(), shopId, 'Écharpe Hermès Cashmere Gris', 'Écharpe Hermès 100% cashmere, imprimé chevaux, coloris gris/or, état neuf.', 'Hermès', 'acc-scarves', 'excellent', 'Taille unique', 'Gris', p(600,800), 480, 0, 'active', 0);
}

// SEO default
const seoCount = db.prepare('SELECT COUNT(*) as c FROM seo_settings').get() as any;
if (seoCount.c === 0) {
  db.prepare('INSERT INTO seo_settings (id, site_title, site_description, site_keywords) VALUES (?, ?, ?, ?)').run(
    'global',
    'Magali Berdah | Vente & Enchères de Mode Luxe',
    'Découvrez des pièces de luxe uniques en vente et aux enchères. Sacs, vêtements, accessoires de grandes maisons.',
    'luxe, mode, sacs, enchères, Hermès, Chanel, Dior, Gucci, Vuitton'
  );
}

export default db;
