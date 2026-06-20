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
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  name_fr TEXT NOT NULL,
  name_en TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  parent_id TEXT,
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
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS bids (
  id TEXT PRIMARY KEY,
  item_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  amount REAL NOT NULL,
  created_at TEXT DEFAULT (datetime('now'))
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
  delivered_at TEXT
);

CREATE TABLE IF NOT EXISTS messages (
  id TEXT PRIMARY KEY,
  order_id TEXT NOT NULL,
  sender_id TEXT NOT NULL,
  content TEXT NOT NULL,
  read INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
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
  id TEXT PRIMARY KEY,
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
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS notifications (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT,
  read INTEGER DEFAULT 0,
  data TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);
