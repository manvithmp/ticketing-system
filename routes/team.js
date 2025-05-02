const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Team Member Schema
const teamMemberSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true, enum: ['Admin', 'Member'] },
});

// Team Member Model
const TeamMember = mongoose.model('TeamMember', teamMemberSchema);

// Route to get all team members
router.get('/team', async (req, res) => {
  try {
    const teamMembers = await TeamMember.find();
    res.status(200).json(teamMembers);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching team members', error: err.message });
  }
});

// Route to add a new team member
router.post('/team', async (req, res) => {
  const { fullName, phone, email, role } = req.body;

  try {
    const newMember = new TeamMember({ fullName, phone, email, role });
    await newMember.save();
    res.status(201).json({ message: 'Team member added successfully', member: newMember });
  } catch (err) {
    res.status(500).json({ message: 'Error adding team member', error: err.message });
  }
});

// Route to update a team member
router.put('/team/:id', async (req, res) => {
  const { id } = req.params;
  const { fullName, phone, email, role } = req.body;

  try {
    const updatedMember = await TeamMember.findByIdAndUpdate(
      id,
      { fullName, phone, email, role },
      { new: true } // Return the updated document
    );

    if (!updatedMember) {
      return res.status(404).json({ message: 'Team member not found' });
    }

    res.status(200).json({ message: 'Team member updated successfully', member: updatedMember });
  } catch (err) {
    res.status(500).json({ message: 'Error updating team member', error: err.message });
  }
});

// Route to delete a team member
router.delete('/team/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedMember = await TeamMember.findByIdAndDelete(id);

    if (!deletedMember) {
      return res.status(404).json({ message: 'Team member not found' });
    }

    res.status(200).json({ message: 'Team member deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting team member', error: err.message });
  }
});

module.exports = router;