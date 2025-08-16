const express = require('express');
const { NutritionLog, NutritionGoals, WaterLog } = require('../models/Nutrition');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/nutrition/logs/:userId
// @desc    Get user's nutrition logs
// @access  Private
router.get('/logs/:userId', auth, async (req, res) => {
  try {
    const { userId } = req.params;
    const { mealType, date, limit = 50 } = req.query;

    if (req.user.userId !== userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    let query = { userId };
    if (mealType) query.mealType = mealType;
    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setHours(23, 59, 59, 999);
      query.date = { $gte: startDate, $lte: endDate };
    }

    const logs = await NutritionLog.find(query)
      .sort({ date: -1, time: -1 })
      .limit(parseInt(limit));

    res.json({ logs });

  } catch (error) {
    console.error('Get nutrition logs error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   POST /api/nutrition/logs
// @desc    Log food intake
// @access  Private
router.post('/logs', auth, async (req, res) => {
  try {
    const {
      mealType,
      name,
      calories,
      protein,
      carbs,
      fat,
      fiber,
      sugar,
      sodium,
      serving,
      quantity,
      category,
      notes
    } = req.body;

    const userId = req.user.userId;
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const log = new NutritionLog({
      userId,
      mealType,
      name,
      calories,
      protein,
      carbs,
      fat,
      fiber,
      sugar,
      sodium,
      serving,
      quantity,
      category,
      time,
      notes
    });

    await log.save();

    // Send real-time notification
    const io = req.app.get('io');
    io.to(`user-${userId}`).emit('food-logged', {
      mealType,
      name,
      calories: log.totalCalories,
      time
    });

    res.status(201).json({
      message: 'Food logged successfully',
      log
    });

  } catch (error) {
    console.error('Log food error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/nutrition/goals/:userId
// @desc    Get user's nutrition goals
// @access  Private
router.get('/goals/:userId', auth, async (req, res) => {
  try {
    const { userId } = req.params;

    if (req.user.userId !== userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    let goals = await NutritionGoals.findOne({ userId });
    
    if (!goals) {
      // Create default goals
      goals = new NutritionGoals({
        userId,
        calories: 2000,
        protein: 150,
        carbs: 250,
        fat: 65,
        fiber: 25,
        sugar: 50,
        sodium: 2300,
        water: 2.5
      });
      await goals.save();
    }

    res.json({ goals });

  } catch (error) {
    console.error('Get nutrition goals error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   PUT /api/nutrition/goals/:userId
// @desc    Update nutrition goals
// @access  Private
router.put('/goals/:userId', auth, async (req, res) => {
  try {
    const { userId } = req.params;

    if (req.user.userId !== userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    let goals = await NutritionGoals.findOne({ userId });
    
    if (!goals) {
      goals = new NutritionGoals({ userId, ...req.body });
    } else {
      Object.keys(req.body).forEach(key => {
        goals[key] = req.body[key];
      });
    }

    await goals.save();

    res.json({
      message: 'Nutrition goals updated successfully',
      goals
    });

  } catch (error) {
    console.error('Update nutrition goals error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/nutrition/daily/:userId
// @desc    Get daily nutrition summary
// @access  Private
router.get('/daily/:userId', auth, async (req, res) => {
  try {
    const { userId } = req.params;
    const { date } = req.query;

    if (req.user.userId !== userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const targetDate = date ? new Date(date) : new Date();
    const goals = await NutritionGoals.findOne({ userId });
    const dailyTotals = await NutritionLog.getDailyTotals(userId, targetDate);
    const waterIntake = await WaterLog.getDailyWaterIntake(userId, targetDate);

    const summary = {
      date: targetDate,
      goals: goals || {},
      totals: dailyTotals,
      waterIntake,
      progress: {
        calories: goals ? Math.round((dailyTotals.calories / goals.calories) * 100) : 0,
        protein: goals ? Math.round((dailyTotals.protein / goals.protein) * 100) : 0,
        carbs: goals ? Math.round((dailyTotals.carbs / goals.carbs) * 100) : 0,
        fat: goals ? Math.round((dailyTotals.fat / goals.fat) * 100) : 0,
        water: goals ? Math.round((waterIntake / goals.water) * 100) : 0
      }
    };

    res.json({ summary });

  } catch (error) {
    console.error('Get daily nutrition error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   POST /api/nutrition/water
// @desc    Log water intake
// @access  Private
router.post('/water', auth, async (req, res) => {
  try {
    const { amount, type, notes } = req.body;
    const userId = req.user.userId;
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const waterLog = new WaterLog({
      userId,
      amount,
      type,
      time,
      notes
    });

    await waterLog.save();

    // Send real-time notification
    const io = req.app.get('io');
    io.to(`user-${userId}`).emit('water-logged', {
      amount,
      type,
      time
    });

    res.status(201).json({
      message: 'Water logged successfully',
      waterLog
    });

  } catch (error) {
    console.error('Log water error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router; 