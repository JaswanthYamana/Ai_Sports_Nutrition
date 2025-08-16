const express = require('express');
const router = express.Router();
const { MaintenanceTask, UserMaintenanceSchedule } = require('../models/Maintenance');
const Equipment = require('../models/Equipment');
const auth = require('../middleware/auth');

// @route   GET /api/maintenance/guides
// @desc    Get maintenance guides
// @access  Public
router.get('/guides', async (req, res) => {
  try {
    const { category, difficulty, search } = req.query;
    
    // For now, return sample guides since we don't have a MaintenanceGuide model yet
    // In a real implementation, you would create a MaintenanceGuide model and fetch from DB
    const sampleGuides = [
      {
        _id: "guide1",
        title: "Running Shoes Care & Maintenance",
        category: "Footwear",
        difficulty: "Easy",
        duration: "15 min",
        frequency: "Weekly",
        equipment: ["Running Shoes", "Soft brush", "Mild detergent"],
        steps: [
          "Remove laces and insoles",
          "Clean exterior with soft brush and mild soap",
          "Air dry at room temperature (avoid direct heat)",
          "Replace insoles if worn out",
          "Rotate between multiple pairs to extend life",
        ],
        tips: [
          "Never put running shoes in washing machine",
          "Replace every 300-500 miles",
          "Store in well-ventilated area",
        ],
        description: "Complete guide for maintaining running shoes",
        image: null
      },
      {
        _id: "guide2",
        title: "Tennis Racket String Maintenance",
        category: "Racket Sports",
        difficulty: "Medium",
        duration: "30 min",
        frequency: "Monthly",
        equipment: ["Tennis racket", "String tension gauge", "Replacement strings"],
        steps: [
          "Check string tension regularly",
          "Inspect for fraying or broken strings",
          "Clean strings with damp cloth after play",
          "Restring when tension drops significantly",
          "Store in protective case",
        ],
        tips: [
          "Restring every 3-6 months for regular players",
          "Higher tension = more control, lower tension = more power",
          "Professional stringing recommended",
        ],
        description: "Professional tennis racket maintenance guide",
        image: null
      },
      {
        _id: "guide3",
        title: "Bike Chain Lubrication",
        category: "Cycling",
        difficulty: "Easy",
        duration: "10 min",
        frequency: "Bi-weekly",
        equipment: ["Bike chain lubricant", "Clean rag", "Chain cleaning tool"],
        steps: [
          "Clean chain with degreaser",
          "Wipe chain dry with clean rag",
          "Apply lubricant to each chain link",
          "Wipe excess lubricant",
          "Test chain movement",
        ],
        tips: [
          "Use wet lube for wet conditions, dry lube for dry conditions",
          "Don't over-lubricate",
          "Clean chain every 100-200 miles",
        ],
        description: "Essential bike chain maintenance for smooth riding",
        image: null
      }
    ];

    let filteredGuides = sampleGuides;

    // Apply filters
    if (category) {
      filteredGuides = filteredGuides.filter(guide => 
        guide.category.toLowerCase().includes(category.toLowerCase())
      );
    }

    if (difficulty) {
      filteredGuides = filteredGuides.filter(guide => 
        guide.difficulty.toLowerCase() === difficulty.toLowerCase()
      );
    }

    if (search) {
      filteredGuides = filteredGuides.filter(guide => 
        guide.title.toLowerCase().includes(search.toLowerCase()) ||
        guide.category.toLowerCase().includes(search.toLowerCase()) ||
        guide.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    res.json({ guides: filteredGuides });
  } catch (error) {
    console.error('Get maintenance guides error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/maintenance/tasks
// @desc    Get maintenance tasks for equipment
// @access  Public
router.get('/tasks', async (req, res) => {
  try {
    const { equipmentId, category, difficulty } = req.query;
    
    let query = {};
    if (equipmentId) query.equipment = equipmentId;
    if (category) query.category = category;
    if (difficulty) query.difficulty = difficulty;

    const tasks = await MaintenanceTask.find(query)
      .populate('equipment', 'name category brand')
      .sort({ difficulty: 1, estimatedTime: 1 });

    res.json({ tasks });
  } catch (error) {
    console.error('Get maintenance tasks error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/maintenance/schedule
// @desc    Get user's maintenance schedule
// @access  Private
router.get('/schedule', auth, async (req, res) => {
  try {
    const schedule = await UserMaintenanceSchedule.find({ user: req.user.userId })
      .populate('equipment', 'name category brand images')
      .populate('maintenanceTask', 'title description frequency estimatedTime difficulty')
      .sort({ scheduledDate: 1 });

    res.json({ schedule });
  } catch (error) {
    console.error('Get maintenance schedule error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   POST /api/maintenance/schedule
// @desc    Add maintenance task to user's schedule
// @access  Private
router.post('/schedule', auth, async (req, res) => {
  try {
    const { title, description, equipment, frequency, priority } = req.body;

    if (!title || !equipment) {
      return res.status(400).json({ error: 'Title and equipment are required' });
    }

    // Calculate next scheduled date based on frequency
    const currentDate = new Date();
    const nextDate = calculateNextScheduledDate(currentDate, frequency || 'weekly');

    const scheduleItem = new UserMaintenanceSchedule({
      user: req.user.userId,
      title: title,
      description: description || '',
      equipment: equipment,
      frequency: frequency || 'weekly',
      priority: priority || 'Medium',
      status: 'pending',
      dueDate: nextDate,
      scheduledDate: currentDate,
      nextScheduledDate: nextDate
    });

    await scheduleItem.save();

    res.json({
      _id: scheduleItem._id,
      title: scheduleItem.title,
      description: scheduleItem.description,
      equipment: scheduleItem.equipment,
      frequency: scheduleItem.frequency,
      priority: scheduleItem.priority,
      status: scheduleItem.status,
      dueDate: scheduleItem.dueDate,
      scheduledDate: scheduleItem.scheduledDate
    });
  } catch (error) {
    console.error('Add maintenance schedule error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   PUT /api/maintenance/schedule/:id/complete
// @desc    Mark maintenance task as complete
// @access  Private
router.put('/schedule/:id/complete', auth, async (req, res) => {
  try {
    const { notes } = req.body;
    
    const scheduleItem = await UserMaintenanceSchedule.findOne({
      _id: req.params.id,
      user: req.user.userId
    });

    if (!scheduleItem) {
      return res.status(404).json({ error: 'Maintenance task not found' });
    }

    scheduleItem.status = 'completed';
    scheduleItem.completedDate = new Date();
    if (notes) scheduleItem.notes = notes;

    // Calculate and set next scheduled date
    const task = await MaintenanceTask.findById(scheduleItem.maintenanceTask);
    if (task) {
      scheduleItem.nextScheduledDate = calculateNextScheduledDate(new Date(), task.frequency);
    }

    await scheduleItem.save();
    await scheduleItem.populate('equipment', 'name category brand images');
    await scheduleItem.populate('maintenanceTask', 'title description frequency estimatedTime difficulty');

    res.json(scheduleItem);
  } catch (error) {
    console.error('Complete maintenance task error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   DELETE /api/maintenance/schedule/:id
// @desc    Remove maintenance task from schedule
// @access  Private
router.delete('/schedule/:id', auth, async (req, res) => {
  try {
    const scheduleItem = await UserMaintenanceSchedule.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId
    });

    if (!scheduleItem) {
      return res.status(404).json({ error: 'Maintenance task not found' });
    }

    res.json({ message: 'Maintenance task removed from schedule' });
  } catch (error) {
    console.error('Remove maintenance schedule error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Helper function to calculate next scheduled date
function calculateNextScheduledDate(currentDate, frequency) {
  const date = new Date(currentDate);
  
  switch (frequency) {
    case 'daily':
      date.setDate(date.getDate() + 1);
      break;
    case 'weekly':
      date.setDate(date.getDate() + 7);
      break;
    case 'monthly':
      date.setMonth(date.getMonth() + 1);
      break;
    case 'quarterly':
      date.setMonth(date.getMonth() + 3);
      break;
    case 'yearly':
      date.setFullYear(date.getFullYear() + 1);
      break;
    default:
      return null; // For 'as-needed' frequency
  }
  
  return date;
}

module.exports = router;
