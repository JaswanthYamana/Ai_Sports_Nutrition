const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const http = require('http');
const socketIo = require('socket.io');

// Load environment variables
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/sportspro')
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    console.error('💡 Please check your MONGODB_URI in .env file');
    console.error('💡 Make sure MongoDB Atlas is accessible and credentials are correct');
  });

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const coachRoutes = require('./routes/coach');
const healthRoutes = require('./routes/health');
const nutritionRoutes = require('./routes/nutrition');
const communityRoutes = require('./routes/community');
const eventRoutes = require('./routes/events');
const careerRoutes = require('./routes/career');

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/coach', coachRoutes);
app.use('/api/health', healthRoutes);
app.use('/api/nutrition', nutritionRoutes);
app.use('/api/community', communityRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/career', careerRoutes);

// Health check endpoint
app.get('/api/health-check', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'SportsPro API is running',
    timestamp: new Date().toISOString(),
    mongodbStatus: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('🔌 User connected:', socket.id);

  socket.on('join-user-room', (userId) => {
    socket.join(`user-${userId}`);
    console.log(`👤 User ${userId} joined their room`);
  });

  // Health tracking real-time updates
  socket.on('vital-logged', (data) => {
    socket.to(`user-${data.userId}`).emit('vital-update', data);
  });

  socket.on('sleep-logged', (data) => {
    socket.to(`user-${data.userId}`).emit('sleep-update', data);
  });

  socket.on('disconnect', () => {
    console.log('🔌 User disconnected:', socket.id);
  });
});

// Make io available to routes
app.set('io', io);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Error:', err);
  
  // Mongoose validation error
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: {
        message: 'Validation error',
        details: Object.values(err.errors).map(e => e.message)
      }
    });
  }

  // MongoDB duplicate key error
  if (err.code === 11000) {
    return res.status(409).json({
      error: {
        message: 'Duplicate entry',
        field: Object.keys(err.keyPattern)[0]
      }
    });
  }

  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal server error',
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    }
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 5001;

server.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📱 Frontend URL: ${process.env.FRONTEND_URL || "http://localhost:3000"}`);
  console.log(`🔒 Environment: ${process.env.NODE_ENV}`);
});

module.exports = { app, io };