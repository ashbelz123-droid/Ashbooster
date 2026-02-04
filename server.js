// server.js
// AshMediaBoost – Production Ready Server

require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

/* =========================
   BASIC MIDDLEWARE
========================= */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =========================
   STATIC FILES (CSS / JS)
========================= */
app.use(express.static(path.join(__dirname, 'public')));

/* =========================
   DATABASE CONNECTION
========================= */
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.warn('⚠️  MONGO_URI not provided. Running without database.');
} else {
  mongoose
    .connect(MONGO_URI)
    .then(() => console.log('✅ MongoDB connected'))
    .catch(err => {
      console.error('❌ MongoDB connection error:', err.message);
    });
}

/* =========================
   ROUTES
========================= */

// Home
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>AshMediaBoost</title>
        <link rel="stylesheet" href="/css/style.css">
      </head>
      <body>
        <h1>AshMediaBoost 🚀</h1>
        <p>Server is live and ready.</p>
      </body>
    </html>
  `);
});

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date()
  });
});

// Pesapal test endpoint
app.get('/pesapal', (req, res) => {
  res.json({
    consumerKey: !!process.env.PESAPAL_CONSUMER_KEY,
    environment: process.env.PESAPAL_ENV || 'not set'
  });
});

// Social Share API test
app.get('/socialshare', (req, res) => {
  res.json({
    apiKey: !!process.env.SOCIALSPHARE_API_KEY,
    apiUrl: process.env.SOCIALSPHARE_API_URL || null
  });
});

/* =========================
   404 HANDLER
========================= */
app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found'
  });
});

/* =========================
   SERVER START
========================= */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ AshMediaBoost running on port ${PORT}`);
});
