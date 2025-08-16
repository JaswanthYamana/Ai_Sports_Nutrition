const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/community/groups
// @desc    Get community groups
// @access  Public
router.get('/groups', async (req, res) => {
  try {
    const { sport, level } = req.query;

    // Mock community groups
    const groups = [
      {
        id: '1',
        name: 'Running Enthusiasts',
        sport: 'Running',
        level: 'All Levels',
        members: 1250,
        activity: 'Very Active',
        description: 'A community for runners of all levels'
      },
      {
        id: '2',
        name: 'Tennis Players Club',
        sport: 'Tennis',
        level: 'Intermediate',
        members: 450,
        activity: 'Active',
        description: 'Tennis community for intermediate players'
      }
    ];

    res.json({ groups });

  } catch (error) {
    console.error('Get groups error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/community/feed
// @desc    Get community feed
// @access  Private
router.get('/feed', auth, async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;

    // Mock community feed
    const feed = [
      {
        id: '1',
        userId: 'user1',
        userName: 'John Doe',
        type: 'workout',
        content: 'Just completed a 10km run!',
        timestamp: new Date(),
        likes: 15,
        comments: 3
      },
      {
        id: '2',
        userId: 'user2',
        userName: 'Jane Smith',
        type: 'achievement',
        content: 'Unlocked the "Consistency Champion" badge!',
        timestamp: new Date(Date.now() - 3600000),
        likes: 25,
        comments: 5
      }
    ];

    res.json({ feed });

  } catch (error) {
    console.error('Get feed error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router; 