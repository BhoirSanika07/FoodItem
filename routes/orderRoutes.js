const express = require('express');
const router = express.Router();
const { placeOrder, getMyOrders, getOrder, cancelOrder, getAllOrders, updateOrderStatus } = require('../controllers/orderController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.use(protect); // All order routes require auth

router.post('/',                      placeOrder);
router.get('/my-orders',              getMyOrders);
router.get('/all',                    adminOnly, getAllOrders);
router.get('/:id',                    getOrder);
router.put('/:id/cancel',             cancelOrder);
router.put('/:id/status',             adminOnly, updateOrderStatus);

module.exports = router;
