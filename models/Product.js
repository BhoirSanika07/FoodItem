const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['Snacks', 'Lunch', 'Dinner', 'Veg', 'Non-Veg', 'Vegan'],
    },
    dietType: {
      type: String,
      required: [true, 'Diet type is required'],
      enum: ['veg', 'nonveg', 'vegan'],
    },
    emoji: {
      type: String,
      default: '🍽',
    },
    image: {
      type: String,
      default: '',
    },
    rating: {
      type: Number,
      default: 4.0,
      min: 0,
      max: 5,
    },
    ratingCount: {
      type: Number,
      default: 0,
    },
    preparationTime: {
      type: String,
      default: '20 min',
    },
    tag: {
      type: String,  // e.g. "Bestseller", "Chef's Pick"
      default: '',
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    isVeg: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for fast searching
productSchema.index({ name: 'text', description: 'text' });
productSchema.index({ category: 1, dietType: 1 });

module.exports = mongoose.model('Product', productSchema);
