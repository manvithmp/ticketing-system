const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/User'); // Adjust the path based on your folder structure
const dotenv = require('dotenv');
dotenv.config();

const router = express.Router();  // Use router to define routes

// Hash password function
const hashPassword = async (password) => {
  let salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
  let hash = await bcrypt.hash(password, salt);
  return hash;
};

// Compare password with hash function
const hashCompare = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

// Generate JWT token function
const createToken = async (payload) => {
  const token = await jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
  return token;
};

// Decode JWT token function
const decodeToken = async (token) => {
  const payload = await jwt.decode(token);
  return payload;
};

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: 'User not found' });
    }

    // Compare the password with the hashed password in the database
    const isMatch = await hashCompare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ message: 'Invalid credentials' });
    }

    // Check if the user's status is active
    if (user.status === 'InActive') {
      return res.status(403).send({ message: 'Your account is inactive' });
    }

    // Create a token
    const payload = { id: user._id, email: user.email, role: user.role };
    const token = await createToken(payload);

    // Return success response with the token and user data
    res.status(200).send({
      message: 'Login successful',
      token: token,
      userData: {
        id: user._id,
        email: user.email,
        role: user.role,
        status: user.status
      }
    });
  } catch (error) {
    res.status(500).send({ message: 'Server error', error: error.message });
  }
});

// Middleware to protect routes
const validate = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from headers
  if (!token) {
    return res.status(401).send({ message: 'No token found' });
  }

  try {
    const payload = await decodeToken(token);
    req.userId = payload.id; // Attach user ID to request object
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

    if (currentTime < payload.exp) {
      next(); // Proceed to the next middleware/route handler
    } else {
      res.status(401).send({ message: 'Token expired' });
    }
  } catch (error) {
    res.status(401).send({ message: 'Invalid token', error: error.message });
  }
};

// Admin guard middleware
const adminGuard = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from headers
  if (!token) {
    return res.status(401).send({ message: 'No token found' });
  }

  try {
    const payload = await decodeToken(token);
    if (payload.role !== 'admin') {
      return res.status(403).send({ message: 'Only admin can access this resource' });
    }
    next(); // Proceed to the next middleware/route handler
  } catch (error) {
    res.status(401).send({ message: 'Invalid token', error: error.message });
  }
};

// Export the router for use in server.js
module.exports = {
  router,  // Export the router
  validate,
  adminGuard
};