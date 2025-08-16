const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Workout = require('../models/Workout');
const NutritionLog = require('../models/Nutrition');
const VitalLog = require('../models/Health');
const auth = require('../middleware/auth');

// Admin middleware - check if user is admin
const adminAuth = async (req, res, next) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }
    next();
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// @route   GET /api/admin/dashboard
// @desc    Get admin dashboard stats
// @access  Admin only
router.get('/dashboard', auth, adminAuth, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const verifiedUsers = await User.countDocuments({ isEmailVerified: true });
    const activeUsers = await User.countDocuments({ isActive: true });
    const totalWorkouts = await Workout.countDocuments();
    const totalNutritionLogs = await NutritionLog.countDocuments();
    const totalVitalLogs = await VitalLog.countDocuments();

    // Recent registrations
    const recentUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .select('name email sport createdAt isEmailVerified');

    // User growth over time
    const userGrowth = await User.aggregate([
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    res.json({
      stats: {
        totalUsers,
        verifiedUsers,
        activeUsers,
        totalWorkouts,
        totalNutritionLogs,
        totalVitalLogs,
        verificationRate: totalUsers > 0 ? (verifiedUsers / totalUsers * 100).toFixed(2) : 0
      },
      recentUsers,
      userGrowth
    });
  } catch (error) {
    console.error('Admin dashboard error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/admin/users
// @desc    Get all users with pagination
// @access  Admin only
router.get('/users', auth, adminAuth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const search = req.query.search || '';
    const role = req.query.role || '';
    const verified = req.query.verified;

    const query = {};
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (role) query.role = role;
    if (verified !== undefined) query.isEmailVerified = verified === 'true';

    const totalUsers = await User.countDocuments(query);
    const totalPages = Math.ceil(totalUsers / limit);

    const users = await User.find(query)
      .select('-password -emailVerificationToken -resetPasswordToken')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      users,
      pagination: {
        currentPage: page,
        totalPages,
        totalUsers,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   PUT /api/admin/users/:id
// @desc    Update user (admin)
// @access  Admin only
router.put('/users/:id', auth, adminAuth, async (req, res) => {
  try {
    const { role, isActive, isEmailVerified } = req.body;
    
    const updateData = {};
    if (role !== undefined) updateData.role = role;
    if (isActive !== undefined) updateData.isActive = isActive;
    if (isEmailVerified !== undefined) updateData.isEmailVerified = isEmailVerified;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User updated successfully', user });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   DELETE /api/admin/users/:id
// @desc    Delete user (admin)
// @access  Admin only
router.delete('/users/:id', auth, adminAuth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.role === 'admin') {
      return res.status(400).json({ error: 'Cannot delete admin users' });
    }

    await User.findByIdAndDelete(req.params.id);
    
    // Also delete related data
    await Workout.deleteMany({ userId: req.params.id });
    await NutritionLog.deleteMany({ userId: req.params.id });
    await VitalLog.deleteMany({ userId: req.params.id });

    res.json({ message: 'User and all related data deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   POST /api/admin/users/:id/verify
// @desc    Manually verify user email
// @access  Admin only
router.post('/users/:id/verify', auth, adminAuth, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { 
        isEmailVerified: true,
        emailVerificationToken: undefined,
        emailVerificationExpires: undefined
      },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User email verified successfully', user });
  } catch (error) {
    console.error('Verify user error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/admin/system-stats
// @desc    Get system performance stats
// @access  Admin only
router.get('/system-stats', auth, adminAuth, async (req, res) => {
  try {
    const now = new Date();
    const last24h = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const last7d = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const last30d = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const stats = {
      last24h: {
        newUsers: await User.countDocuments({ createdAt: { $gte: last24h } }),
        newWorkouts: await Workout.countDocuments({ createdAt: { $gte: last24h } }),
        newNutritionLogs: await NutritionLog.countDocuments({ createdAt: { $gte: last24h } })
      },
      last7d: {
        newUsers: await User.countDocuments({ createdAt: { $gte: last7d } }),
        newWorkouts: await Workout.countDocuments({ createdAt: { $gte: last7d } }),
        newNutritionLogs: await NutritionLog.countDocuments({ createdAt: { $gte: last7d } })
      },
      last30d: {
        newUsers: await User.countDocuments({ createdAt: { $gte: last30d } }),
        newWorkouts: await Workout.countDocuments({ createdAt: { $gte: last30d } }),
        newNutritionLogs: await NutritionLog.countDocuments({ createdAt: { $gte: last30d } })
      }
    };

    res.json(stats);
  } catch (error) {
    console.error('System stats error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router; 