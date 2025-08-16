const express = require('express');
const auth = require('../middleware/auth');
const Equipment = require('../models/Equipment');

const router = express.Router();

// @route   GET /api/equipment/stats
// @desc    Get equipment statistics for dashboard
// @access  Public
router.get('/stats', async (req, res) => {
  try {
    console.log('Fetching equipment stats...');
    
    // Get all equipment first
    const allEquipment = await Equipment.find({ isActive: true });
    console.log('Found equipment count:', allEquipment.length);

    // Calculate equipment reviews count
    let equipmentReviews = 0;
    allEquipment.forEach(equipment => {
      if (equipment.reviews && equipment.reviews.length > 0) {
        equipmentReviews += equipment.reviews.length;
      }
    });

    // Get unique sports covered
    const uniqueSports = [...new Set(allEquipment.map(eq => eq.sport))];
    const sportsCovered = uniqueSports.length;

    // Get total equipment count as price comparisons
    const priceComparisons = allEquipment.length;

    // Get maintenance guides count (using sample data for now)
    const maintenanceGuides = 12;

    const stats = {
      equipmentReviews,
      sportsCovered,
      priceComparisons,
      maintenanceGuides
    };

    console.log('Calculated stats:', stats);
    res.json({ stats });
  } catch (error) {
    console.error('Get equipment stats error:', error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

// @route   GET /api/equipment
// @desc    Get equipment list with filtering and search
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { sport, category, priceRange, rating, search, sortBy, page = 1, limit = 20 } = req.query;

    // Build query
    let query = { isActive: true };
    
    if (sport && sport !== 'all') {
      query.sport = new RegExp(sport, 'i');
    }
    
    if (category && category !== 'all') {
      query.category = new RegExp(category, 'i');
    }
    
    if (search) {
      query.$text = { $search: search };
    }
    
    if (priceRange && priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(Number);
      if (max) {
        query.price = { $gte: min, $lte: max };
      } else {
        query.price = { $gte: min };
      }
    }
    
    if (rating) {
      query.rating = { $gte: Number(rating) };
    }

    // Build sort
    let sort = {};
    switch (sortBy) {
      case 'price-low':
        sort.price = 1;
        break;
      case 'price-high':
        sort.price = -1;
        break;
      case 'rating':
        sort.rating = -1;
        break;
      case 'newest':
        sort.createdAt = -1;
        break;
      default:
        sort.rating = -1;
    }

    const equipment = await Equipment.find(query)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('reviews.user', 'name')
      .exec();

    const total = await Equipment.countDocuments(query);

    res.json({ 
      equipment,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      }
    });

  } catch (error) {
    console.error('Get equipment error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/equipment/:id
// @desc    Get single equipment item
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const equipment = await Equipment.findById(req.params.id)
      .populate('reviews.user', 'name avatar')
      .exec();

    if (!equipment) {
      return res.status(404).json({ error: 'Equipment not found' });
    }

    res.json({ equipment });
  } catch (error) {
    console.error('Get equipment by ID error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   POST /api/equipment/:id/review
// @desc    Add review to equipment
// @access  Private
router.post('/:id/review', auth, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    const equipment = await Equipment.findById(req.params.id);
    if (!equipment) {
      return res.status(404).json({ error: 'Equipment not found' });
    }

    // Check if user already reviewed this equipment
    const existingReview = equipment.reviews.find(
      review => review.user.toString() === req.user.userId
    );

    if (existingReview) {
      return res.status(400).json({ error: 'You have already reviewed this equipment' });
    }

    // Add review
    equipment.reviews.push({
      user: req.user.userId,
      rating,
      comment: comment || '',
      createdAt: new Date()
    });

    // Update average rating
    const totalRating = equipment.reviews.reduce((sum, review) => sum + review.rating, 0);
    equipment.rating = totalRating / equipment.reviews.length;
    equipment.reviewCount = equipment.reviews.length;

    await equipment.save();

    res.json({ message: 'Review added successfully', equipment });
  } catch (error) {
    console.error('Add review error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/equipment/recommendations/:userId
// @desc    Get personalized equipment recommendations
// @access  Private
router.get('/recommendations/:userId', auth, async (req, res) => {
  try {
    const userId = req.params.userId;
    
    if (req.user.userId !== userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Build recommendation query based on user's sport and preferences
    let query = { isActive: true };
    if (user.sport) {
      query.sport = new RegExp(user.sport, 'i');
    }

    const recommendations = await Equipment.find(query)
      .sort({ rating: -1, reviews: -1 })
      .limit(6)
      .exec();

    res.json({ recommendations });
  } catch (error) {
    console.error('Get recommendations error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});



module.exports = router; 