const express = require('express');
const router = express.Router();
const { getProducts, getProduct, createProduct, updateProduct, deleteProduct, seedDB } = require('../controllers/productController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/',          getProducts);
router.get('/:id',       getProduct);
router.post('/seed',     seedDB);              // Seed DB (open for dev)
router.post('/',         protect, adminOnly, createProduct);
router.put('/:id',       protect, adminOnly, updateProduct);
router.delete('/:id',    protect, adminOnly, deleteProduct);

module.exports = router;
