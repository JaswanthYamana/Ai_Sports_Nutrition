const mongoose = require('mongoose');

const nutritionLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  mealType: {
    type: String,
    enum: ['breakfast', 'lunch', 'dinner', 'snacks'],
    required: [true, 'Meal type is required']
  },
  name: {
    type: String,
    required: [true, 'Food name is required'],
    trim: true
  },
  calories: {
    type: Number,
    required: [true, 'Calories are required'],
    min: [0, 'Calories cannot be negative']
  },
  protein: {
    type: Number,
    min: [0, 'Protein cannot be negative'],
    default: 0
  },
  carbs: {
    type: Number,
    min: [0, 'Carbs cannot be negative'],
    default: 0
  },
  fat: {
    type: Number,
    min: [0, 'Fat cannot be negative'],
    default: 0
  },
  fiber: {
    type: Number,
    min: [0, 'Fiber cannot be negative'],
    default: 0
  },
  sugar: {
    type: Number,
    min: [0, 'Sugar cannot be negative'],
    default: 0
  },
  sodium: {
    type: Number,
    min: [0, 'Sodium cannot be negative'],
    default: 0
  },
  serving: {
    type: String,
    required: [true, 'Serving size is required']
  },
  quantity: {
    type: Number,
    default: 1,
    min: [0.1, 'Quantity must be at least 0.1']
  },
  date: {
    type: Date,
    default: Date.now
  },
  time: {
    type: String,
    required: [true, 'Time is required']
  },
  category: {
    type: String,
    enum: ['Protein', 'Carbs', 'Healthy Fats', 'Fruits', 'Vegetables', 'Dairy', 'Nuts', 'Grains', 'Other'],
    default: 'Other'
  },
  barcode: String,
  image: String,
  notes: String,
  isCustom: {
    type: Boolean,
    default: false
  },
  verified: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const nutritionGoalsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required'],
    unique: true
  },
  calories: {
    type: Number,
    required: [true, 'Calorie goal is required'],
    min: [1000, 'Calorie goal must be at least 1000'],
    max: [5000, 'Calorie goal cannot exceed 5000']
  },
  protein: {
    type: Number,
    required: [true, 'Protein goal is required'],
    min: [0, 'Protein goal cannot be negative']
  },
  carbs: {
    type: Number,
    required: [true, 'Carbs goal is required'],
    min: [0, 'Carbs goal cannot be negative']
  },
  fat: {
    type: Number,
    required: [true, 'Fat goal is required'],
    min: [0, 'Fat goal cannot be negative']
  },
  fiber: {
    type: Number,
    min: [0, 'Fiber goal cannot be negative'],
    default: 25
  },
  sugar: {
    type: Number,
    min: [0, 'Sugar goal cannot be negative'],
    default: 50
  },
  sodium: {
    type: Number,
    min: [0, 'Sodium goal cannot be negative'],
    default: 2300
  },
  water: {
    type: Number, // in liters
    min: [0.5, 'Water goal must be at least 0.5L'],
    default: 2.5
  },
  mealPlan: {
    breakfast: { type: Number, default: 25 }, // percentage of daily calories
    lunch: { type: Number, default: 35 },
    dinner: { type: Number, default: 30 },
    snacks: { type: Number, default: 10 }
  },
  dietType: {
    type: String,
    enum: ['balanced', 'low-carb', 'high-protein', 'keto', 'vegetarian', 'vegan', 'paleo', 'mediterranean'],
    default: 'balanced'
  },
  restrictions: [{
    type: String,
    enum: ['gluten-free', 'dairy-free', 'nut-free', 'shellfish-free', 'soy-free']
  }],
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const waterLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  amount: {
    type: Number,
    required: [true, 'Water amount is required'],
    min: [0.1, 'Water amount must be at least 0.1L'],
    max: [2, 'Water amount cannot exceed 2L per log']
  },
  type: {
    type: String,
    enum: ['Water', 'Sports Drink', 'Tea', 'Coffee', 'Other'],
    default: 'Water'
  },
  date: {
    type: Date,
    default: Date.now
  },
  time: {
    type: String,
    required: [true, 'Time is required']
  },
  notes: String
}, {
  timestamps: true
});

// Indexes for better query performance
nutritionLogSchema.index({ userId: 1, date: -1 });
nutritionLogSchema.index({ userId: 1, mealType: 1 });
nutritionLogSchema.index({ date: -1 });

waterLogSchema.index({ userId: 1, date: -1 });
waterLogSchema.index({ date: -1 });

// Virtual for total nutrition values
nutritionLogSchema.virtual('totalCalories').get(function() {
  return this.calories * this.quantity;
});

nutritionLogSchema.virtual('totalProtein').get(function() {
  return this.protein * this.quantity;
});

nutritionLogSchema.virtual('totalCarbs').get(function() {
  return this.carbs * this.quantity;
});

nutritionLogSchema.virtual('totalFat').get(function() {
  return this.fat * this.quantity;
});

// Method to calculate daily totals
nutritionLogSchema.statics.getDailyTotals = async function(userId, date) {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);
  
  const logs = await this.find({
    userId,
    date: { $gte: startOfDay, $lte: endOfDay }
  });
  
  return logs.reduce((totals, log) => {
    totals.calories += log.totalCalories;
    totals.protein += log.totalProtein;
    totals.carbs += log.totalCarbs;
    totals.fat += log.totalFat;
    totals.fiber += (log.fiber * log.quantity);
    totals.sugar += (log.sugar * log.quantity);
    totals.sodium += (log.sodium * log.quantity);
    return totals;
  }, {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    fiber: 0,
    sugar: 0,
    sodium: 0
  });
};

// Method to calculate water intake for a day
waterLogSchema.statics.getDailyWaterIntake = async function(userId, date) {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);
  
  const logs = await this.find({
    userId,
    date: { $gte: startOfDay, $lte: endOfDay }
  });
  
  return logs.reduce((total, log) => total + log.amount, 0);
};

module.exports = {
  NutritionLog: mongoose.model('NutritionLog', nutritionLogSchema),
  NutritionGoals: mongoose.model('NutritionGoals', nutritionGoalsSchema),
  WaterLog: mongoose.model('WaterLog', waterLogSchema)
}; 