const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

  // Auth routes (Login route is included here)
const authRoutes = require('./api/auth/login'); // Import login.js correctly
app.use('/api/auth', authRoutes.router);  // Use router from login.js

// Protected route
const authenticateToken = authRoutes.validate;  // Use middleware to authenticate token

app.get('/dashboard', authenticateToken, (req, res) => {
  res.json({ message: `Welcome ${req.userId}, you're in the dashboard!` });
});

// Routes
const teamRoutes = require('./routes/team'); 
app.use('/api', teamRoutes);

const updateProfileRoutes = require('./api/auth/updateProfile'); 
app.use('/api', updateProfileRoutes); 

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});