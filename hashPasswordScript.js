const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('./models/User'); // Adjust the path to your User model
require('dotenv').config();

const hashAndUpdatePassword = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ MongoDB connected');

    // Find the user by email
    const user = await User.findOne({ email: 'Admin@example.com' });
    if (!user) {
      console.error('❌ User not found');
      return;
    }

    // Hash the plain-text password
    const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
    const hashedPassword = await bcrypt.hash('admin@123', salt);

    // Update the user's password in the database
    user.password = hashedPassword;
    await user.save();

    console.log('✅ Password updated successfully');
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    // Close the MongoDB connection
    mongoose.connection.close();
  }
};

hashAndUpdatePassword();