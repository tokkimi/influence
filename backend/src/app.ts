import express from 'express';
import cors from 'cors';
import path from 'path';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';

import './database';
import authRoutes from './routes/auth';
import itemRoutes from './routes/items';
import orderRoutes from './routes/orders';
import adminRoutes from './routes/admin';
import shopRoutes from './routes/shop';
import miscRoutes from './routes/misc';

const app = express();

app.use(cors({
  origin: (origin, cb) => cb(null, true),
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));

// File uploads — write to /tmp on Vercel, ./uploads locally
const uploadDir = process.env.VERCEL
  ? '/tmp/uploads'
  : path.join(__dirname, '../../uploads');
fs.mkdirSync(uploadDir, { recursive: true });
app.use('/uploads', express.static(uploadDir));

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => cb(null, `${uuidv4()}${path.extname(file.originalname)}`),
});
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

app.post('/api/upload', upload.single('file'), (req: any, res: any) => {
  if (!req.file) return res.status(400).json({ error: 'Aucun fichier' });
  res.json({ url: `/uploads/${req.file.filename}` });
});

app.post('/api/upload/multiple', upload.array('files', 10), (req: any, res: any) => {
  if (!req.files || !(req.files as any[]).length) return res.status(400).json({ error: 'Aucun fichier' });
  const urls = (req.files as any[]).map(f => `/uploads/${f.filename}`);
  res.json({ urls });
});

app.get('/api/placeholder/:w/:h', (req: any, res: any) => {
  const { w, h } = req.params;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    <rect width="100%" height="100%" fill="#f5f0eb"/>
    <text x="50%" y="50%" font-family="Georgia,serif" font-size="14" fill="#9e8e7e" text-anchor="middle" dominant-baseline="middle">Photo</text>
  </svg>`;
  res.set('Content-Type', 'image/svg+xml');
  res.send(svg);
});

app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/shops', shopRoutes);
app.use('/api', miscRoutes);

export default app;
