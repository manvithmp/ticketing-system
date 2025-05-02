const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();


app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

const authRoutes = require('./api/auth/login'); 
app.use('/api/auth', authRoutes.router);  

const authenticateToken = authRoutes.validate;  
app.get('/dashboard', authenticateToken, (req, res) => {
  res.json({ message: `Welcome ${req.userId}, you're in the dashboard!` });
});

const teamRoutes = require('./routes/team'); 
app.use('/api', teamRoutes);

const updateProfileRoutes = require('./api/auth/updateProfile'); 
app.use('/api', updateProfileRoutes); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});