import express from 'express';
import cors from 'cors';
import path from 'path';
import http from 'http';
import { Server as SocketServer } from 'socket.io';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';

import './database'; // Init DB
import authRoutes from './routes/auth';
import itemRoutes from './routes/items';
import orderRoutes from './routes/orders';
import adminRoutes from './routes/admin';
import shopRoutes from './routes/shop';
import miscRoutes from './routes/misc';

const app = express();
const server = http.createServer(app);
const io = new SocketServer(server, { cors: { origin: '*' } });

app.use(cors({ origin: '*' }));
app.use(express.json({ limit: '10mb' }));
app.use('/uploads', express.static(path.join(__dirname, '../../uploads')));

// Multer config
const uploadDir = path.join(__dirname, '../../uploads');
fs.mkdirSync(uploadDir, { recursive: true });
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => cb(null, `${uuidv4()}${path.extname(file.originalname)}`),
});
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

app.post('/api/upload', upload.single('file'), (req: any, res) => {
  if (!req.file) return res.status(400).json({ error: 'Aucun fichier' });
  res.json({ url: `/uploads/${req.file.filename}` });
});

app.post('/api/upload/multiple', upload.array('files', 10), (req: any, res) => {
  if (!req.files || !req.files.length) return res.status(400).json({ error: 'Aucun fichier' });
  const urls = (req.files as any[]).map(f => `/uploads/${f.filename}`);
  res.json({ urls });
});

// Placeholder image
app.get('/api/placeholder/:w/:h', (req, res) => {
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

// Socket.io for real-time chat & bids
io.on('connection', (socket) => {
  socket.on('join-order', (orderId: string) => socket.join(`order:${orderId}`));
  socket.on('send-message', (data: { orderId: string; message: any }) => {
    io.to(`order:${data.orderId}`).emit('new-message', data.message);
  });
  socket.on('join-item', (itemId: string) => socket.join(`item:${itemId}`));
  socket.on('new-bid', (data: { itemId: string; bid: any }) => {
    io.to(`item:${data.itemId}`).emit('bid-update', data.bid);
  });
});

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../frontend/dist')));
  app.get('*', (_req, res) => res.sendFile(path.join(__dirname, '../../frontend/dist/index.html')));
}

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => console.log(`🚀 Serveur Magali Berdah sur http://localhost:${PORT}`));
