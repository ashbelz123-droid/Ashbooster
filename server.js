// server.js

require('dotenv').config();  // Load environment variables
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

// Route to serve the home page
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>AshMediaBoost</title>
        <link rel="stylesheet" href="/css/style.css"> <!-- Linking CSS -->
      </head>
      <body>
        <h1>Welcome to AshMediaBoost 🚀</h1>
        <p>Your SMM Panel is ready!</p>
        <a href="/smm-panel">Go to SMM Panel</a>
      </body>
    </html>
  `);
});

// Route to handle the SMM panel
app.get('/smm-panel', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>SMM Panel</title>
        <link rel="stylesheet" href="/css/style.css"> <!-- Linking CSS -->
      </head>
      <body>
        <h1>Welcome to the SMM Panel 🚀</h1>
        <p>Manage your Social Media Marketing activities here.</p>
      </body>
    </html>
  `);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ AshMediaBoost server running on port ${PORT}`);
});
