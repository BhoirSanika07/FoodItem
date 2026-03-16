const Product = require('../models/Product');

// ---- SEED DATA (used to populate DB on first run) ----
const seedProducts = [
  // SNACKS
  { name: 'Masala Dosa', description: 'Crispy rice crepe with spiced potato filling, sambar & chutney', price: 89, category: 'Snacks', dietType: 'veg', emoji: 'https://tse4.mm.bing.net/th/id/OIP.2nMDNL-epjyA_aypL7XAcQHaEK?pid=Api', rating: 4.6, preparationTime: '15 min', tag: 'Popular', isVeg: true },
  { name: 'Vada Pav', description: "Mumbai's iconic street burger with spiced potato fritter & chutneys", price: 45, category: 'Snacks', dietType: 'veg', emoji: '🍔', rating: 4.4, preparationTime: '10 min', isVeg: true },
  { name: 'Samosa (2 pcs)', description: 'Golden fried pastry with spiced potato & peas filling', price: 40, category: 'Snacks', dietType: 'veg', emoji: '🥟', rating: 4.5, preparationTime: '10 min', isVeg: true },
  { name: 'Chicken Tikka Wrap', description: 'Juicy tandoor chicken tikka rolled in soft rumali roti with mint chutney', price: 149, category: 'Snacks', dietType: 'nonveg', emoji: '🌯', rating: 4.7, preparationTime: '18 min', tag: "Chef's Pick", isVeg: false },
  { name: 'Pav Bhaji', description: 'Spiced mashed veggies with buttered pav, onion & lemon', price: 79, category: 'Snacks', dietType: 'veg', emoji: '🥘', rating: 4.5, preparationTime: '15 min', isVeg: true },
  { name: 'Avocado Toast', description: 'Sourdough with smashed avocado, microgreens & chilli flakes', price: 169, category: 'Snacks', dietType: 'vegan', emoji: '🥑', rating: 4.3, preparationTime: '12 min', isVeg: true },
  // LUNCH
  { name: 'Butter Chicken', description: 'Rich tomato-cream curry with tender chicken pieces & butter naan', price: 229, category: 'Lunch', dietType: 'nonveg', emoji: '🍛', rating: 4.8, preparationTime: '25 min', tag: 'Bestseller', isVeg: false },
  { name: 'Dal Makhani', description: 'Slow-cooked black lentils in buttery tomato gravy, best with roti', price: 149, category: 'Lunch', dietType: 'veg', emoji: '🍲', rating: 4.7, preparationTime: '20 min', isVeg: true },
  { name: 'Paneer Tikka Masala', description: 'Charred cottage cheese cubes in spiced creamy masala sauce', price: 189, category: 'Lunch', dietType: 'veg', emoji: '🧀', rating: 4.6, preparationTime: '22 min', isVeg: true },
  { name: 'Vegan Buddha Bowl', description: 'Quinoa, roasted chickpeas, greens, hummus & tahini dressing', price: 199, category: 'Lunch', dietType: 'vegan', emoji: '🥗', rating: 4.4, preparationTime: '18 min', isVeg: true },
  { name: 'Chicken Biryani', description: 'Fragrant basmati with tender chicken, saffron & crispy fried onions', price: 249, category: 'Lunch', dietType: 'nonveg', emoji: '🍚', rating: 4.9, preparationTime: '30 min', tag: 'Fan Favourite', isVeg: false },
  { name: 'Veg Thali', description: 'A complete meal: dal, sabzi, rice, roti, salad & dessert', price: 149, category: 'Lunch', dietType: 'veg', emoji: '🍱', rating: 4.5, preparationTime: '20 min', isVeg: true },
  // DINNER
  { name: 'Mutton Rogan Josh', description: 'Kashmiri lamb curry slow-cooked with aromatic whole spices', price: 299, category: 'Dinner', dietType: 'nonveg', emoji: '🥩', rating: 4.8, preparationTime: '35 min', tag: 'Slow Cooked', isVeg: false },
  { name: 'Spaghetti Arrabbiata', description: 'Al dente pasta in spicy San Marzano tomato & garlic sauce', price: 219, category: 'Dinner', dietType: 'vegan', emoji: '🍝', rating: 4.5, preparationTime: '22 min', isVeg: true },
  { name: 'Prawn Masala', description: 'Succulent tiger prawns in coconut-tomato coastal masala', price: 319, category: 'Dinner', dietType: 'nonveg', emoji: '🦐', rating: 4.7, preparationTime: '28 min', isVeg: false },
  { name: 'Palak Paneer', description: 'Cottage cheese cubes in velvety spiced spinach gravy', price: 169, category: 'Dinner', dietType: 'veg', emoji: '🥬', rating: 4.5, preparationTime: '20 min', isVeg: true },
  { name: 'Vegan Taco Bowl', description: 'Jackfruit carnitas, black beans, corn salsa & cashew sour cream', price: 229, category: 'Dinner', dietType: 'vegan', emoji: '🌮', rating: 4.3, preparationTime: '20 min', isVeg: true },
  { name: 'Grilled Salmon', description: 'Norwegian salmon with herb butter, baby potatoes & greens', price: 389, category: 'Dinner', dietType: 'nonveg', emoji: '🐟', rating: 4.8, preparationTime: '25 min', isVeg: false },
  // VEG
  { name: 'Aloo Gobi', description: 'Classic potato & cauliflower dry curry with cumin & coriander', price: 119, category: 'Veg', dietType: 'veg', emoji: '🥦', rating: 4.2, preparationTime: '18 min', isVeg: true },
  { name: 'Chole Bhature', description: 'Spicy Punjabi chickpea curry with deep-fried fluffy bhature', price: 129, category: 'Veg', dietType: 'veg', emoji: '🫘', rating: 4.6, preparationTime: '20 min', isVeg: true },
  { name: 'Mushroom Stroganoff', description: 'Creamy Russian-style mushroom sauce over buttered egg noodles', price: 189, category: 'Veg', dietType: 'veg', emoji: '🍄', rating: 4.4, preparationTime: '20 min', isVeg: true },
  // NON-VEG
  { name: 'Tandoori Chicken', description: 'Half chicken marinated & roasted in clay tandoor with mint chutney', price: 289, category: 'Non-Veg', dietType: 'nonveg', emoji: '🍗', rating: 4.7, preparationTime: '30 min', isVeg: false },
  { name: 'Egg Curry', description: 'Farm eggs in spiced tomato-onion gravy, best with steamed rice', price: 149, category: 'Non-Veg', dietType: 'nonveg', emoji: '🥚', rating: 4.4, preparationTime: '18 min', isVeg: false },
  // VEGAN
  { name: 'Vegan Burger', description: 'Chickpea-oat patty, lettuce, tomato, vegan mayo & pickles', price: 179, category: 'Vegan', dietType: 'vegan', emoji: '🌱', rating: 4.3, preparationTime: '15 min', isVeg: true },
  { name: 'Raw Mango Salad', description: 'Shredded green mango, chilli, roasted peanuts & lime dressing', price: 99, category: 'Vegan', dietType: 'vegan', emoji: '🥭', rating: 4.2, preparationTime: '10 min', isVeg: true },
];

// @desc    Seed products into DB (only if empty)
// @route   POST /api/products/seed
// @access  Admin
const seedDB = async (req, res) => {
  try {
    const count = await Product.countDocuments();
    if (count > 0) {
      return res.json({ success: true, message: `DB already has ${count} products. Skipping seed.` });
    }
    const products = await Product.insertMany(seedProducts);
    res.status(201).json({
      success: true,
      message: `✅ Seeded ${products.length} products into MongoDB!`,
      count: products.length,
    });
  } catch (error) {
    console.error('Seed error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all products (with filters & search)
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const { category, dietType, search, sort } = req.query;

    // Build filter object
    const filter = { isAvailable: true };
    if (category && category !== 'All') filter.category = category;
    if (dietType && dietType !== 'all')  filter.dietType = dietType;
    if (search) {
      filter.$or = [
        { name:        { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { category:    { $regex: search, $options: 'i' } },
      ];
    }

    // Build sort object
    let sortObj = {};
    if (sort === 'price_asc')  sortObj = { price: 1 };
    else if (sort === 'price_desc') sortObj = { price: -1 };
    else if (sort === 'rating') sortObj = { rating: -1 };
    else sortObj = { createdAt: -1 };

    const products = await Product.find(filter).sort(sortObj);

    res.json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create product (admin only)
// @route   POST /api/products
// @access  Admin
const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, product });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const msgs = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({ success: false, message: msgs.join(', ') });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update product (admin only)
// @route   PUT /api/products/:id
// @access  Admin
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete product (admin only)
// @route   DELETE /api/products/:id
// @access  Admin
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.json({ success: true, message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getProducts, getProduct, createProduct, updateProduct, deleteProduct, seedDB };
