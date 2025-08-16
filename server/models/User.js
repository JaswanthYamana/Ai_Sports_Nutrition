const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'moderator'],
    default: 'user'
  },
  sport: String,
  experience: String,
  fitnessLevel: String,
  goals: [String],
  location: String,
  bio: String,
  avatar: {
    type: String,
    default: '/placeholder-user.jpg'
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  emailVerificationToken: String,
  emailVerificationExpires: Date,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  lastLogin: Date,
  preferences: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
    default: {}
  },
  stats: {
    workouts: { type: Number, default: 0 },
    totalHours: { type: Number, default: 0 },
    achievements: { type: Number, default: 0 },
    currentStreak: { type: Number, default: 0 },
    totalPoints: { type: Number, default: 0 },
    rank: { type: Number, default: 0 }
  }
}, {
  timestamps: true
});

// Add indexes for better query performance
userSchema.index({ email: 1 });
userSchema.index({ role: 1 });
userSchema.index({ location: 1 });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Remove sensitive data from JSON output
userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  delete user.emailVerificationToken;
  delete user.emailVerificationExpires;
  delete user.resetPasswordToken;
  delete user.resetPasswordExpires;
  return user;
};

module.exports = mongoose.model('User', userSchema);