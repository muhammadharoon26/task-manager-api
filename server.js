// import 'dotenv/config';
// import express from 'express';
// import cors from 'cors';
// import { createServer } from 'http';
// import { Server } from 'socket.io';
// import { connectDB } from './config/db.js';
// import authRoutes from './routes/auth.js';
// import taskRoutes from './routes/task.js';
// import authMiddleware from './middlewares/authMiddleware.js';

// const app = express();

// // Middleware
// app.use(express.json());
// app.use(cors({ origin: process.env.FRONTEND_URL || '*' }));

// // Connect to MongoDB
// (async () => {
//   await connectDB();
// })();

// // Create HTTP server and configure Socket.io
// const server = createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: process.env.FRONTEND_URL || '*',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   },
// });

// io.on('connection', (socket) => {
//   console.log('User connected');

//   socket.on('disconnect', () => {
//     console.log('User disconnected');
//   });
// });

// // Authentication Routes
// app.use('/api/auth', authRoutes);

// // Task Routes (Protected)
// app.use('/api/tasks', authMiddleware, taskRoutes);

// // Global Error Handler
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ message: 'Something went wrong!', error: err.message });
// });

// // Start Server
// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));









import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.js';
import taskRoutes from './routes/task.js';
import authMiddleware from './middlewares/authMiddleware.js';

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL || '*' }));

// Connect to MongoDB
(async () => {
  try {
    await connectDB();
    console.log('✔ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1); // Exit process on DB connection failure
  }
})();

// Create HTTP server and configure Socket.io
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
});

io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Authentication Routes
app.use('/api/auth', authRoutes);

// Task Routes (Protected)
app.use('/api/tasks', authMiddleware, taskRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Error stack:', err.stack);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message || 'Something went wrong!',
    error: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
