const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/users/:id
// @desc    Get user profile
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select('-password');
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });

  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   PUT /api/users/:id
// @desc    Update user profile
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    
    if (req.user.userId !== id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update allowed fields
    const allowedUpdates = ['name', 'age', 'sport', 'experience', 'fitnessLevel', 'goals', 'location', 'bio', 'preferences'];
    allowedUpdates.forEach(field => {
      if (req.body[field] !== undefined) {
        user[field] = req.body[field];
      }
    });

    await user.save();

    res.json({
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        age: user.age,
        sport: user.sport,
        experience: user.experience,
        fitnessLevel: user.fitnessLevel,
        goals: user.goals,
        location: user.location,
        bio: user.bio,
        avatar: user.avatar,
        preferences: user.preferences,
        stats: user.stats
      }
    });

  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   PATCH /api/users/preferences
// @desc    Update user preferences
// @access  Private
router.patch('/preferences', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Initialize preferences if they don't exist
    if (!user.preferences) {
      user.preferences = {};
    }

    // Update preferences
    const { sports, budget, goals, fitnessLevel } = req.body;
    
    if (sports !== undefined) {
      user.preferences.sports = sports;
    }
    if (budget !== undefined) {
      user.preferences.budget = budget;
    }
    if (goals !== undefined) {
      user.preferences.goals = goals;
    }
    if (fitnessLevel !== undefined) {
      user.preferences.fitnessLevel = fitnessLevel;
    }

    await user.save();

    res.json({ 
      message: 'Preferences updated successfully',
      preferences: user.preferences 
    });

  } catch (error) {
    console.error('Update preferences error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router; 