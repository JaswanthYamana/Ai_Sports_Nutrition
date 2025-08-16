const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/events
// @desc    Get events list
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { sport, category, location, date } = req.query;

    // Mock events data
    const events = [
      {
        id: '1',
        title: 'Local Running Club Meetup',
        category: 'Community',
        sport: 'Running',
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        location: 'Central Park, New York',
        participants: 25,
        maxParticipants: 50,
        description: 'Weekly running group for all levels'
      },
      {
        id: '2',
        title: 'Tennis Tournament',
        category: 'Competition',
        sport: 'Tennis',
        date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
        location: 'City Tennis Center',
        participants: 32,
        maxParticipants: 64,
        description: 'Annual tennis championship'
      }
    ];

    res.json({ events });

  } catch (error) {
    console.error('Get events error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   POST /api/events/:id/join
// @desc    Join an event
// @access  Private
router.post('/:id/join', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    // Mock join logic
    res.json({ message: 'Successfully joined event' });

  } catch (error) {
    console.error('Join event error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router; 