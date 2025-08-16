const express = require('express');
const Workout = require('../models/Workout');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/workouts/:userId
// @desc    Get user's workouts
// @access  Private
router.get('/:userId', auth, async (req, res) => {
  try {
    const { userId } = req.params;
    const { type, sport, date, limit = 20, page = 1 } = req.query;

    if (req.user.userId !== userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    let query = { userId };
    if (type) query.type = type;
    if (sport) query.sport = sport;
    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setHours(23, 59, 59, 999);
      query.date = { $gte: startDate, $lte: endDate };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const workouts = await Workout.find(query)
      .sort({ date: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Workout.countDocuments(query);

    res.json({
      workouts,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });

  } catch (error) {
    console.error('Get workouts error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   POST /api/workouts
// @desc    Create a new workout
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const {
      name,
      type,
      sport,
      exercises,
      duration,
      calories,
      intensity,
      notes,
      tags,
      location,
      weather,
      isTemplate,
      templateName
    } = req.body;

    const userId = req.user.userId;

    const workout = new Workout({
      userId,
      name,
      type,
      sport,
      exercises,
      duration,
      calories,
      intensity,
      notes,
      tags,
      location,
      weather,
      isTemplate,
      templateName
    });

    await workout.save();

    // Send real-time notification
    const io = req.app.get('io');
    io.to(`user-${userId}`).emit('workout-created', {
      workoutId: workout._id,
      name: workout.name,
      type: workout.type
    });

    res.status(201).json({
      message: 'Workout created successfully',
      workout
    });

  } catch (error) {
    console.error('Create workout error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   PUT /api/workouts/:id
// @desc    Update a workout
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const workout = await Workout.findOne({ _id: id, userId });
    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }

    // Update fields
    Object.keys(req.body).forEach(key => {
      if (key !== 'userId' && key !== '_id') {
        workout[key] = req.body[key];
      }
    });

    await workout.save();

    res.json({
      message: 'Workout updated successfully',
      workout
    });

  } catch (error) {
    console.error('Update workout error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   DELETE /api/workouts/:id
// @desc    Delete a workout
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const workout = await Workout.findOneAndDelete({ _id: id, userId });
    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }

    res.json({ message: 'Workout deleted successfully' });

  } catch (error) {
    console.error('Delete workout error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   POST /api/workouts/:id/start
// @desc    Start a workout
// @access  Private
router.post('/:id/start', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const workout = await Workout.findOne({ _id: id, userId });
    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }

    workout.startTime = new Date();
    await workout.save();

    res.json({
      message: 'Workout started',
      workout
    });

  } catch (error) {
    console.error('Start workout error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   POST /api/workouts/:id/complete
// @desc    Complete a workout
// @access  Private
router.post('/:id/complete', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, notes } = req.body;
    const userId = req.user.userId;

    const workout = await Workout.findOne({ _id: id, userId });
    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }

    workout.endTime = new Date();
    workout.completed = true;
    if (rating) workout.rating = rating;
    if (notes) workout.notes = notes;

    await workout.save();

    // Send real-time notification
    const io = req.app.get('io');
    io.to(`user-${userId}`).emit('workout-completed', {
      workoutId: workout._id,
      name: workout.name,
      duration: workout.calculatedDuration,
      calories: workout.calories
    });

    res.json({
      message: 'Workout completed successfully',
      workout
    });

  } catch (error) {
    console.error('Complete workout error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/workouts/:userId/stats
// @desc    Get workout statistics
// @access  Private
router.get('/:userId/stats', auth, async (req, res) => {
  try {
    const { userId } = req.params;
    const { days = 30 } = req.query;

    if (req.user.userId !== userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(days));

    const workouts = await Workout.find({
      userId,
      completed: true,
      date: { $gte: startDate, $lte: endDate }
    });

    const stats = {
      totalWorkouts: workouts.length,
      totalDuration: workouts.reduce((sum, w) => sum + (w.calculatedDuration || 0), 0),
      totalCalories: workouts.reduce((sum, w) => sum + (w.calories || 0), 0),
      averageDuration: workouts.length > 0 ? 
        Math.round(workouts.reduce((sum, w) => sum + (w.calculatedDuration || 0), 0) / workouts.length) : 0,
      averageCalories: workouts.length > 0 ? 
        Math.round(workouts.reduce((sum, w) => sum + (w.calories || 0), 0) / workouts.length) : 0,
      byType: {},
      bySport: {}
    };

    // Calculate stats by type and sport
    workouts.forEach(workout => {
      stats.byType[workout.type] = (stats.byType[workout.type] || 0) + 1;
      stats.bySport[workout.sport] = (stats.bySport[workout.sport] || 0) + 1;
    });

    res.json({ stats });

  } catch (error) {
    console.error('Get workout stats error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router; 