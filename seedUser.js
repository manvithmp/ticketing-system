const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User'); // Adjust the path to your User model
require('dotenv').config();

const seedUser = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ MongoDB connected');

    // Check if the admin user already exists
    const existingUser = await User.findOne({ email: 'Admin@example.com' });

    if (existingUser) {
      console.log('Admin user already exists. Updating additional fields...');
      // Update the admin user's fields
      existingUser.firstName = 'Admin';
      existingUser.lastName = 'M';
      existingUser.role = 'admin';
      existingUser.status = 'Active';

      // Save the updated user data
      await existingUser.save();
      console.log('✅ Admin user updated successfully in MongoDB');
    } else {
      console.log('Admin user not found. Creating a new admin user...');
      // Hash the password
      const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS || 10));
      const hashedPassword = await bcrypt.hash('admin@123', salt);

      // Create the admin user
      const newUser = new User({
        email: 'Admin@example.com',
        password: hashedPassword,
        role: 'admin',
        status: 'Active',
        firstName: 'Admin',
        lastName: 'M',
      });

      await newUser.save();
      console.log('✅ Admin user created successfully in MongoDB');
    }
  } catch (error) {
    console.error('❌ Error in seedUser:', error.message);
  } finally {
    mongoose.connection.close();
    console.log('🔒 MongoDB connection closed');
  }
};

seedUser();