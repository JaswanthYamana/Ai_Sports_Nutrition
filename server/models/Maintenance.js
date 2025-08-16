const mongoose = require('mongoose');

const maintenanceTaskSchema = new mongoose.Schema({
  equipment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Equipment',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  frequency: {
    type: String,
    enum: ['daily', 'weekly', 'monthly', 'quarterly', 'yearly', 'as-needed'],
    required: true
  },
  estimatedTime: {
    type: Number, // in minutes
    required: true
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  },
  tools: [{
    type: String
  }],
  materials: [{
    name: String,
    quantity: String
  }],
  steps: [{
    stepNumber: Number,
    instruction: String,
    image: String
  }],
  tags: [{
    type: String
  }]
});

const userMaintenanceScheduleSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  equipment: {
    type: String,
    required: true
  },
  frequency: {
    type: String,
    enum: ['daily', 'weekly', 'monthly', 'quarterly', 'yearly'],
    default: 'weekly'
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium'
  },
  scheduledDate: {
    type: Date,
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  completedDate: {
    type: Date
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'overdue', 'skipped'],
    default: 'pending'
  },
  notes: {
    type: String
  },
  nextScheduledDate: {
    type: Date
  }
}, {
  timestamps: true
});

const maintenanceTaskModel = mongoose.model('MaintenanceTask', maintenanceTaskSchema);
const userMaintenanceScheduleModel = mongoose.model('UserMaintenanceSchedule', userMaintenanceScheduleSchema);

module.exports = {
  MaintenanceTask: maintenanceTaskModel,
  UserMaintenanceSchedule: userMaintenanceScheduleModel
};
