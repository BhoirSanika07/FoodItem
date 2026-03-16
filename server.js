// ============================================================
//  BHOJAN - Main Server Entry Point
//  Run: npm run dev
// ============================================================
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load env variables FIRST before anything else
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// ---- MIDDLEWARE ----
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true,
}));
app.use(express.json());        // Parse JSON request bodies
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));         // Log all HTTP requests in terminal

// ---- API ROUTES ----
app.use('/api/auth',     require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/cart',     require('./routes/cartRoutes'));
app.use('/api/orders',   require('./routes/orderRoutes'));

// ---- HEALTH CHECK ----
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Bhojan API is running!',
    timestamp: new Date().toISOString(),
  });
});

// ---- 404 HANDLER ----
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

// ---- GLOBAL ERROR HANDLER ----
app.use((err, req, res, next) => {
  console.error('Server Error:', err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📖 API docs: http://localhost:${PORT}/api/health`);
});
