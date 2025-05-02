const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../../models/User'); // Adjust the path to your User model
const router = express.Router();

// Route to update user profile
router.post('/update-profile', async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  try {
    // Validate input
    if (password && password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    // Find the user by email (assuming the user is authenticated and provides the correct email)
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user details
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (password) {
      // Hash the new password
      const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS || 10));
      user.password = await bcrypt.hash(password, salt);
    }

    // Save changes to the database
    await user.save();

    // Log update confirmation
    console.log(`✅ User profile updated for ${email} in MongoDB`);

    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('❌ Error updating profile:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;