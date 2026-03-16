const Order = require('../models/Order');
const Cart = require('../models/Cart');

// @desc    Place a new order
// @route   POST /api/orders
// @access  Private
const placeOrder = async (req, res) => {
  try {
    const { deliveryAddress, paymentMethod, notes } = req.body;

    // Validate required fields
    if (!deliveryAddress || !paymentMethod) {
      return res.status(400).json({
        success: false,
        message: 'Delivery address and payment method are required',
      });
    }
    const { name, phone, street, city, pincode } = deliveryAddress;
    if (!name || !phone || !street || !city || !pincode) {
      return res.status(400).json({
        success: false,
        message: 'Complete delivery address is required (name, phone, street, city, pincode)',
      });
    }

    // Get user's cart
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ success: false, message: 'Your cart is empty' });
    }

    // Build order items (snapshot current data)
    const orderItems = cart.items.map((item) => ({
      product:  item.product._id,
      name:     item.product.name,
      emoji:    item.product.emoji,
      quantity: item.quantity,
      price:    item.price, // Price at time of adding to cart
    }));

    // Calculate pricing
    const subtotal    = cart.totalPrice;
    const deliveryFee = subtotal >= 299 ? 0 : 40;
    const discount    = subtotal >= 500 ? Math.round(subtotal * 0.1) : 0;
    const totalAmount = subtotal + deliveryFee - discount;

    // Create order
    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      deliveryAddress,
      subtotal,
      deliveryFee,
      discount,
      totalAmount,
      paymentMethod,
      paymentStatus: paymentMethod === 'cod' ? 'pending' : 'pending',
      notes: notes || '',
    });

    // Clear the cart after order
    await Cart.findOneAndUpdate({ user: req.user._id }, { items: [] });

    // Populate for response
    const populatedOrder = await Order.findById(order._id).populate('user', 'name email');

    res.status(201).json({
      success: true,
      message: '🎉 Order placed successfully!',
      order: populatedOrder,
    });
  } catch (error) {
    console.error('Place order error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all orders of logged in user
// @route   GET /api/orders/my-orders
// @access  Private
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .populate('items.product', 'name emoji');

    res.json({ success: true, count: orders.length, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.product', 'name emoji image');

    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });

    // Users can only see their own orders
    if (order.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Cancel order
// @route   PUT /api/orders/:id/cancel
// @access  Private
const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });

    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    if (['delivered', 'cancelled'].includes(order.orderStatus)) {
      return res.status(400).json({
        success: false,
        message: `Cannot cancel an order that is already ${order.orderStatus}`,
      });
    }

    order.orderStatus = 'cancelled';
    await order.save();

    res.json({ success: true, message: 'Order cancelled successfully', order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get ALL orders (admin only)
// @route   GET /api/orders/all
// @access  Admin
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .sort({ createdAt: -1 })
      .populate('user', 'name email phone');

    res.json({ success: true, count: orders.length, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update order status (admin only)
// @route   PUT /api/orders/:id/status
// @access  Admin
const updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus, paymentStatus } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { ...(orderStatus && { orderStatus }), ...(paymentStatus && { paymentStatus }) },
      { new: true }
    );
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { placeOrder, getMyOrders, getOrder, cancelOrder, getAllOrders, updateOrderStatus };
