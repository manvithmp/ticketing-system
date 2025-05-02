// server/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
  status: {
    type: String,
    enum: ['Active', 'InActive'],
    default: 'Active',
  },
});

module.exports = mongoose.model('User', userSchema);
