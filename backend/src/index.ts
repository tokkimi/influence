import http from 'http';
import { Server as SocketServer } from 'socket.io';
import app from './app';

const server = http.createServer(app);
const io = new SocketServer(server, { cors: { origin: '*' } });

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

// Serve frontend in production (local only — Vercel serves frontend separately)
if (process.env.NODE_ENV === 'production' && !process.env.VERCEL) {
  const path = require('path');
  app.use(require('express').static(path.join(__dirname, '../../frontend/dist')));
  app.get('*', (_req: any, res: any) => res.sendFile(path.join(__dirname, '../../frontend/dist/index.html')));
}

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => console.log(`🚀 Serveur Magali Berdah sur http://localhost:${PORT}`));
