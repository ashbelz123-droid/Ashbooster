// server.js – Full working script for AshMediaBoost

require('dotenv').config();  // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

// Middleware for parsing requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (CSS/JS)
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB connection setup
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error('❌ MONGO_URI is not set. Please provide it in the .env file.');
} else {
  mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('✅ MongoDB connected'))
    .catch((err) => {
      console.error('❌ Error connecting to MongoDB:', err.message);
    });
}

// Home route – displays a welcome page with a link to the SMM Panel
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>AshMediaBoost</title>
        <link rel="stylesheet" href="/css/style.css"> <!-- Static CSS link -->
      </head>
      <body>
        <h1>Welcome to AshMediaBoost 🚀</h1>
        <p>Your SMM Panel is ready!</p>
        <a href="/smm-panel">Go to SMM Panel</a> <!-- Correct link to SMM Panel -->
        <br>
        <h2>Need support? Contact us on WhatsApp</h2>
        <a href="https://wa.me/yourwhatsappnumber">Chat on WhatsApp</a> <!-- WhatsApp link -->
      </body>
    </html>
  `);
});

// SMM Panel route – the main panel for your services
app.get('/smm-panel', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>SMM Panel</title>
        <link rel="stylesheet" href="/css/style.css"> <!-- Static CSS link -->
      </head>
      <body>
        <h1>Welcome to the SMM Panel 🚀</h1>
        <p>Manage your Social Media Marketing activities here.</p>
        <ul>
          <li><a href="#">Manage Posts</a></li>
          <li><a href="#">Analytics</a></li>
          <li><a href="#">Settings</a></li>
        </ul>
        <br>
        <h2>Need support? Contact us on WhatsApp</h2>
        <a href="https://wa.me/yourwhatsappnumber">Chat on WhatsApp</a> <!-- WhatsApp link -->
      </body>
    </html>
  `);
});

// Health check route – useful for monitoring
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date(),
  });
});

// Test route for Pesapal integration (mock data)
app.get('/pesapal', (req, res) => {
  res.json({
    consumerKey: process.env.PESAPAL_CONSUMER_KEY || 'Not Set',
    consumerSecret: process.env.PESAPAL_CONSUMER_SECRET || 'Not Set',
    environment: process.env.PESAPAL_ENV || 'Not Set',
  });
});

// Test route for Social Share API (mock data)
app.get('/socialshare', (req, res) => {
  res.json({
    apiKey: process.env.SOCIALSPHARE_API_KEY || 'Not Set',
    apiUrl: process.env.SOCIALSPHARE_API_URL || 'Not Set',
  });
});

// 404 handler for non-existent routes
app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found',
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ AshMediaBoost server running on port ${PORT}`);
});
