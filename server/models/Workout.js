const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Exercise name is required'],
    trim: true
  },
  sets: [{
    reps: {
      type: Number,
      min: [0, 'Reps cannot be negative']
    },
    weight: {
      type: Number,
      min: [0, 'Weight cannot be negative']
    },
    duration: {
      type: Number, // in seconds
      min: [0, 'Duration cannot be negative']
    },
    distance: {
      type: Number, // in meters
      min: [0, 'Distance cannot be negative']
    },
    completed: {
      type: Boolean,
      default: false
    },
    notes: String
  }],
  restTime: {
    type: Number, // in seconds
    default: 60
  },
  order: {
    type: Number,
    required: true
  }
});

const workoutSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  name: {
    type: String,
    required: [true, 'Workout name is required'],
    trim: true,
    maxlength: [100, 'Workout name cannot exceed 100 characters']
  },
  type: {
    type: String,
    enum: ['strength', 'cardio', 'flexibility', 'sports', 'mixed'],
    required: [true, 'Workout type is required']
  },
  sport: {
    type: String,
    enum: ['Football', 'Basketball', 'Tennis', 'Swimming', 'Running', 'Cycling', 'Gym/Fitness', 'Yoga', 'Boxing', 'Golf', 'Cricket', 'Badminton', 'Other'],
    default: 'Other'
  },
  exercises: [exerciseSchema],
  duration: {
    type: Number, // in minutes
    min: [0, 'Duration cannot be negative']
  },
  calories: {
    type: Number,
    min: [0, 'Calories cannot be negative']
  },
  intensity: {
    type: String,
    enum: ['low', 'moderate', 'high', 'very-high'],
    default: 'moderate'
  },
  date: {
    type: Date,
    default: Date.now
  },
  startTime: Date,
  endTime: Date,
  completed: {
    type: Boolean,
    default: false
  },
  notes: {
    type: String,
    maxlength: [500, 'Notes cannot exceed 500 characters']
  },
  tags: [String],
  location: String,
  weather: {
    temperature: Number,
    condition: String
  },
  heartRate: {
    average: Number,
    max: Number,
    min: Number
  },
  rating: {
    type: Number,
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot exceed 5']
  },
  difficulty: {
    type: String,
    enum: ['easy', 'moderate', 'hard', 'very-hard'],
    default: 'moderate'
  },
  isTemplate: {
    type: Boolean,
    default: false
  },
  templateName: String,
  shared: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Indexes for better query performance
workoutSchema.index({ userId: 1, date: -1 });
workoutSchema.index({ userId: 1, type: 1 });
workoutSchema.index({ userId: 1, sport: 1 });
workoutSchema.index({ date: -1 });

// Virtual for workout duration calculation
workoutSchema.virtual('calculatedDuration').get(function() {
  if (this.startTime && this.endTime) {
    return Math.round((this.endTime - this.startTime) / 1000 / 60); // minutes
  }
  return this.duration;
});

// Virtual for total exercises
workoutSchema.virtual('totalExercises').get(function() {
  return this.exercises.length;
});

// Virtual for completed exercises
workoutSchema.virtual('completedExercises').get(function() {
  return this.exercises.filter(exercise => 
    exercise.sets.some(set => set.completed)
  ).length;
});

// Method to calculate total calories
workoutSchema.methods.calculateCalories = function() {
  // Basic calorie calculation based on duration and intensity
  const baseCaloriesPerMinute = {
    'low': 3,
    'moderate': 6,
    'high': 10,
    'very-high': 15
  };
  
  const duration = this.calculatedDuration || this.duration || 0;
  const intensityMultiplier = baseCaloriesPerMinute[this.intensity] || 6;
  
  return Math.round(duration * intensityMultiplier);
};

// Pre-save middleware to calculate calories if not provided
workoutSchema.pre('save', function(next) {
  if (!this.calories && this.duration) {
    this.calories = this.calculateCalories();
  }
  next();
});

module.exports = mongoose.model('Workout', workoutSchema); 