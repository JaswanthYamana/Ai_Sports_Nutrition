const express = require('express');
const { VitalLog, SleepLog } = require('../models/Health');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/health/vitals/:userId
// @desc    Get user's vital signs
// @access  Private
router.get('/vitals/:userId', auth, async (req, res) => {
  try {
    const { userId } = req.params;
    const { type, days = 7 } = req.query;

    if (req.user.userId !== userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    let query = { userId };
    if (type) {
      query.type = type;
    }

    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(days));
    query.date = { $gte: startDate, $lte: endDate };

    const vitals = await VitalLog.find(query)
      .sort({ date: -1, time: -1 })
      .limit(100);

    res.json({ vitals });
  } catch (error) {
    console.error('Error fetching vitals:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   POST /api/health/vitals
// @desc    Log vital signs
// @access  Private
router.post('/vitals', auth, async (req, res) => {
  try {
    const vitalLog = new VitalLog({
      ...req.body,
      userId: req.user.userId
    });

    await vitalLog.save();
    res.status(201).json({ message: 'Vital signs logged successfully', vitalLog });

  } catch (error) {
    console.error('Log vitals error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/health/vitals/:userId/trends
// @desc    Get user's vital trends
// @access  Private
router.get('/vitals/:userId/trends', auth, async (req, res) => {
  try {
    const { userId } = req.params;
    const { type } = req.query;
    
    if (req.user.userId !== userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const logs = await VitalLog.find({
      userId,
      type,
      date: { $gte: weekAgo }
    }).sort({ date: 1 });

    // Calculate trend
    const trend = logs.map(log => ({
      date: log.date,
      value: log.value
    }));

    // Calculate trend direction and change percentage
    const firstValue = logs[0]?.value || 0;
    const lastValue = logs[logs.length - 1]?.value || 0;
    const changePercent = firstValue ? ((lastValue - firstValue) / firstValue) * 100 : 0;
    const trendDirection = changePercent > 0 ? 'increasing' : changePercent < 0 ? 'decreasing' : 'stable';

    res.json({
      trends: {
        data: trend,
        trendDirection,
        changePercent: Math.abs(changePercent)
      }
    });

  } catch (error) {
    console.error('Vital trends error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/health/sleep/:userId
// @desc    Get user's sleep logs
// @access  Private
router.get('/sleep/:userId', auth, async (req, res) => {
  try {
    const { userId } = req.params;
    const { days = 7 } = req.query;

    if (req.user.userId !== userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(days));

    const sleepLogs = await SleepLog.find({
      userId,
      date: { $gte: startDate, $lte: endDate }
    }).sort({ date: -1 });

    res.json({ sleepLogs });
  } catch (error) {
    console.error('Error fetching sleep logs:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   POST /api/health/sleep
// @desc    Log sleep
// @access  Private
router.post('/sleep', auth, async (req, res) => {
  try {
    const sleepLog = new SleepLog({
      ...req.body,
      userId: req.user.userId
    });

    await sleepLog.save();
    res.status(201).json({ message: 'Sleep logged successfully', sleepLog });

  } catch (error) {
    console.error('Log sleep error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/health/sleep/:userId/stats
// @desc    Get user's sleep statistics
// @access  Private
router.get('/sleep/:userId/stats', auth, async (req, res) => {
  try {
    const { userId } = req.params;
    const { days = 7 } = req.query;
    
    if (req.user.userId !== userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - parseInt(days) * 24 * 60 * 60 * 1000);

    const logs = await SleepLog.find({
      userId,
      date: { $gte: startDate, $lte: endDate }
    }).sort({ date: 1 });

    // Calculate statistics
    const trend = logs.map(log => ({
      date: log.date,
      duration: log.duration,
      quality: log.quality
    }));

    const totalSleep = logs.reduce((sum, log) => sum + log.duration, 0);
    const averageDuration = logs.length ? totalSleep / logs.length : 0;
    
    // Calculate sleep schedule consistency
    let consistency = 0;
    if (logs.length > 1) {
      const bedtimeVariances = [];
      const wakeTimeVariances = [];
      
      for (let i = 1; i < logs.length; i++) {
        const prevBedtime = new Date(`2000-01-01T${logs[i-1].bedtime}`);
        const currentBedtime = new Date(`2000-01-01T${logs[i].bedtime}`);
        bedtimeVariances.push(Math.abs(currentBedtime - prevBedtime));

        const prevWakeTime = new Date(`2000-01-01T${logs[i-1].wakeTime}`);
        const currentWakeTime = new Date(`2000-01-01T${logs[i].wakeTime}`);
        wakeTimeVariances.push(Math.abs(currentWakeTime - prevWakeTime));
      }

      const avgBedtimeVariance = bedtimeVariances.reduce((a, b) => a + b, 0) / bedtimeVariances.length;
      const avgWakeTimeVariance = wakeTimeVariances.reduce((a, b) => a + b, 0) / wakeTimeVariances.length;
      
      // Convert variance to a 0-100 scale where lower variance means higher consistency
      consistency = 100 - ((avgBedtimeVariance + avgWakeTimeVariance) / (2 * 60 * 60 * 1000) * 100);
    }

    res.json({
      stats: {
        trend,
        averageDuration,
        scheduleConsistency: Math.max(0, Math.min(100, consistency)),
        bestQuality: logs.length ? 
          logs.sort((a, b) => 
            ['poor', 'fair', 'good', 'excellent'].indexOf(b.quality) - 
            ['poor', 'fair', 'good', 'excellent'].indexOf(a.quality)
          )[0].quality : 'good'
      }
    });

  } catch (error) {
    console.error('Sleep stats error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/health/sleep/:userId/recommendations
// @desc    Get sleep recommendations
// @access  Private
router.get('/sleep/:userId/recommendations', auth, async (req, res) => {
  try {
    const { userId } = req.params;

    if (req.user.userId !== userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const recommendations = await SleepLog.getSleepRecommendations(userId);
    if (!recommendations) {
      return res.status(404).json({ message: 'Not enough data for recommendations' });
    }

    res.json({ recommendations });
  } catch (error) {
    console.error('Error getting recommendations:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/health/dashboard/:userId
// @desc    Get user's health dashboard data
// @access  Private
router.get('/dashboard/:userId', auth, async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Verify user has access
    if (req.user.userId !== userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Get latest vitals
    const latest = {
      heartRate: await VitalLog.findOne({ userId, type: 'heartRate' }).sort({ date: -1 }),
      hydration: await VitalLog.findOne({ userId, type: 'hydration' }).sort({ date: -1 }),
      steps: await VitalLog.findOne({ userId, type: 'steps' }).sort({ date: -1 }),
      sleep: await SleepLog.findOne({ userId }).sort({ date: -1 })
    };

    // Get averages
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const averages = {
      heartRate: await VitalLog.aggregate([
        { 
          $match: { 
            userId: userId, 
            type: 'heartRate',
            date: { $gte: weekAgo }
          }
        },
        { 
          $group: { 
            _id: null, 
            average: { $avg: '$value' } 
          }
        }
      ]).then(result => result[0]?.average || 0),
      hydration: await VitalLog.aggregate([
        { 
          $match: { 
            userId: userId, 
            type: 'hydration',
            date: { $gte: weekAgo }
          }
        },
        { 
          $group: { 
            _id: null, 
            average: { $avg: '$value' } 
          }
        }
      ]).then(result => result[0]?.average || 0)
    };

    res.json({
      dashboardData: {
        latest,
        averages
      }
    });

  } catch (error) {
    console.error('Health dashboard error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;