const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  name:     { type: String, required: true },  // Snapshot of name
  emoji:    { type: String, default: '🍽' },
  quantity: { type: Number, required: true, min: 1 },
  price:    { type: Number, required: true },   // Snapshot of price
});

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    orderNumber: {
      type: String,
      unique: true,
    },
    items: [orderItemSchema],
    deliveryAddress: {
      name:    { type: String, required: true },
      phone:   { type: String, required: true },
      street:  { type: String, required: true },
      city:    { type: String, required: true },
      pincode: { type: String, required: true },
    },
    subtotal:    { type: Number, required: true },
    deliveryFee: { type: Number, default: 40 },
    discount:    { type: Number, default: 0 },
    totalAmount: { type: Number, required: true },
    paymentMethod: {
      type: String,
      enum: ['cod', 'online'],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed'],
      default: 'pending',
    },
    orderStatus: {
      type: String,
      enum: ['confirmed', 'cooking', 'on_the_way', 'delivered', 'cancelled'],
      default: 'confirmed',
    },
    estimatedDelivery: {
      type: Date,
    },
    notes: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// ---- Generate order number before saving ----
orderSchema.pre('save', async function (next) {
  if (!this.orderNumber) {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    this.orderNumber = `BHJ-${timestamp}-${random}`;
  }
  // Set estimated delivery time (30–45 mins from now)
  if (!this.estimatedDelivery) {
    this.estimatedDelivery = new Date(Date.now() + 40 * 60 * 1000);
  }
  next();
});

module.exports = mongoose.model('Order', orderSchema);
