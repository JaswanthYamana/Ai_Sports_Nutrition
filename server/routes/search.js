const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/search
// @desc    Global search
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const { q, category, sortBy = 'relevance' } = req.query;

    if (!q) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    // Mock search results
    const results = {
      workouts: [
        {
          id: '1',
          name: 'Morning Cardio',
          type: 'cardio',
          sport: 'Running',
          relevance: 0.9
        }
      ],
      nutrition: [
        {
          id: '1',
          name: 'Protein Shake Recipe',
          category: 'Recipes',
          relevance: 0.8
        }
      ],
      equipment: [
        {
          id: '1',
          name: 'Running Shoes',
          category: 'Footwear',
          sport: 'Running',
          relevance: 0.7
        }
      ],
      events: [
        {
          id: '1',
          title: 'Local Running Event',
          sport: 'Running',
          date: new Date(),
          relevance: 0.6
        }
      ]
    };

    res.json({ results, query: q });

  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router; 