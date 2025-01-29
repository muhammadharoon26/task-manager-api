// import 'dotenv/config';
// import express from 'express';
// import cors from 'cors';
// import { createServer } from 'http';
// import { Server } from 'socket.io';
// import { connectDB } from './config/db.js';
// import authRoutes from './routes/auth.js';
// import taskRoutes from './routes/task.js';

// const app = express();
// app.use(express.json());
// app.use(cors({ origin: process.env.FRONTEND_URL || '*' }));

// connectDB();
// const server = createServer(app);
// const io = new Server(server, {
//     cors: {
//         origin: process.env.FRONTEND_URL || '*',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     },
// });

// io.on('connection', (socket) => {
//     console.log('User connected');
//     socket.on('disconnect', () => {
//         console.log('User disconnected');
//     });
// });

// app.use('/api/auth', authRoutes);
// app.use('/api/tasks', taskRoutes);

// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));








// server.js
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.js';
import taskRoutes from './routes/task.js';
import mongoose from 'mongoose';

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));

// Connect to MongoDB
(async () => {
  try {
    await connectDB();
    console.log('✔ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }
})();

// Create HTTP server and configure Socket.io
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  },
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('taskUpdate', (data) => {
    socket.broadcast.emit('taskUpdated', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Base route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Task Manager API' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  
  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(400).json({ message: err.message });
  }
  
  if (err.name === 'MongoServerError' && err.code === 11000) {
    return res.status(409).json({ message: 'Resource already exists' });
  }

  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message || 'Internal server error',
    error: process.env.NODE_ENV === 'production' ? null : err.stack
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📱 Socket.IO enabled`);
});

export default app;