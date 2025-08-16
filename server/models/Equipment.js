const mongoose = require('mongoose');

const equipmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true
  },
  sport: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  originalPrice: {
    type: Number
  },
  description: {
    type: String,
    required: true
  },
  features: [{
    type: String
  }],
  specifications: {
    type: Map,
    of: String
  },
  images: [{
    type: String
  }],
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comment: String,
    date: {
      type: Date,
      default: Date.now
    }
  }],
  availability: {
    type: String,
    enum: ['In Stock', 'Out of Stock', 'Pre-order'],
    default: 'In Stock'
  },
  stock: {
    type: Number,
    default: 0
  },
  discount: {
    type: Number,
    default: 0
  },
  tags: [{
    type: String
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Virtual for average rating
equipmentSchema.virtual('averageRating').get(function() {
  if (this.reviews.length === 0) return 0;
  const sum = this.reviews.reduce((acc, review) => acc + review.rating, 0);
  return (sum / this.reviews.length).toFixed(1);
});

// Virtual for review count
equipmentSchema.virtual('reviewCount').get(function() {
  return this.reviews.length;
});

// Index for search functionality
equipmentSchema.index({ name: 'text', description: 'text', brand: 'text' });
equipmentSchema.index({ sport: 1, category: 1 });
equipmentSchema.index({ price: 1 });

module.exports = mongoose.model('Equipment', equipmentSchema);
