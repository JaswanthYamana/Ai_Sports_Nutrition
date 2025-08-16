const mongoose = require('mongoose');

const vitalLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  type: {
    type: String,
    enum: ['heartRate', 'hydration', 'steps', 'calories', 'bloodPressure', 'bloodSugar', 'weight'],
    required: [true, 'Vital type is required']
  },
  value: {
    type: Number,
    required: [true, 'Value is required']
  },
  unit: {
    type: String,
    required: [true, 'Unit is required']
  },
  date: {
    type: Date,
    default: Date.now
  },
  time: {
    type: String,
    required: [true, 'Time is required']
  },
  notes: String,
  source: {
    type: String,
    enum: ['manual', 'device', 'app'],
    default: 'manual'
  }
}, {
  timestamps: true
});

const sleepLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  date: {
    type: Date,
    required: [true, 'Date is required']
  },
  bedtime: {
    type: String,
    required: [true, 'Bedtime is required']
  },
  wakeTime: {
    type: String,
    required: [true, 'Wake time is required']
  },
  duration: {
    type: Number,
    required: [true, 'Duration is required']
  },
  quality: {
    type: String,
    enum: ['excellent', 'good', 'fair', 'poor'],
    required: [true, 'Sleep quality is required']
  },
  deepSleep: Number,
  remSleep: Number,
  lightSleep: Number,
  interruptions: Number,
  factors: [String],
  notes: String
}, {
  timestamps: true
});

// Add indexes for better query performance
vitalLogSchema.index({ userId: 1, type: 1, date: -1 });
vitalLogSchema.index({ userId: 1, date: -1 });
sleepLogSchema.index({ userId: 1, date: -1 });

const VitalLog = mongoose.model('VitalLog', vitalLogSchema);
const SleepLog = mongoose.model('SleepLog', sleepLogSchema);

module.exports = { VitalLog, SleepLog };