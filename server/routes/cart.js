const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Equipment = require('../models/Equipment');
const auth = require('../middleware/auth');

// @route   GET /api/cart
// @desc    Get user's cart
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.userId })
      .populate('items.equipment', 'name price images brand category')
      .exec();

    if (!cart) {
      return res.json({ items: [], totalItems: 0, totalPrice: 0 });
    }

    res.json(cart);
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   POST /api/cart/add
// @desc    Add item to cart
// @access  Private
router.post('/add', auth, async (req, res) => {
  try {
    const { equipmentId, quantity = 1 } = req.body;

    // Validate equipment exists
    const equipment = await Equipment.findById(equipmentId);
    if (!equipment) {
      return res.status(404).json({ error: 'Equipment not found' });
    }

    // Check stock
    if (equipment.stock < quantity) {
      return res.status(400).json({ error: 'Insufficient stock' });
    }

    let cart = await Cart.findOne({ user: req.user.userId });

    if (!cart) {
      // Create new cart
      cart = new Cart({
        user: req.user.userId,
        items: [{
          equipment: equipmentId,
          quantity,
          price: equipment.price
        }]
      });
    } else {
      // Check if item already exists in cart
      const existingItemIndex = cart.items.findIndex(
        item => item.equipment.toString() === equipmentId
      );

      if (existingItemIndex > -1) {
        // Update quantity
        cart.items[existingItemIndex].quantity += quantity;
      } else {
        // Add new item
        cart.items.push({
          equipment: equipmentId,
          quantity,
          price: equipment.price
        });
      }
    }

    await cart.save();
    await cart.populate('items.equipment', 'name price images brand category');

    res.json(cart);
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   PUT /api/cart/update/:itemId
// @desc    Update cart item quantity
// @access  Private
router.put('/update/:itemId', auth, async (req, res) => {
  try {
    const { quantity } = req.body;
    const { itemId } = req.params;

    if (quantity < 1) {
      return res.status(400).json({ error: 'Quantity must be at least 1' });
    }

    const cart = await Cart.findOne({ user: req.user.userId });
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    const item = cart.items.id(itemId);
    if (!item) {
      return res.status(404).json({ error: 'Item not found in cart' });
    }

    item.quantity = quantity;
    await cart.save();
    await cart.populate('items.equipment', 'name price images brand category');

    res.json(cart);
  } catch (error) {
    console.error('Update cart error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   DELETE /api/cart/remove/:itemId
// @desc    Remove item from cart
// @access  Private
router.delete('/remove/:itemId', auth, async (req, res) => {
  try {
    const { itemId } = req.params;

    const cart = await Cart.findOne({ user: req.user.userId });
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    cart.items.pull(itemId);
    await cart.save();
    await cart.populate('items.equipment', 'name price images brand category');

    res.json(cart);
  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   DELETE /api/cart/clear
// @desc    Clear entire cart
// @access  Private
router.delete('/clear', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.userId });
    if (!cart) {
      return res.json({ message: 'Cart is already empty' });
    }

    cart.items = [];
    await cart.save();

    res.json({ message: 'Cart cleared successfully' });
  } catch (error) {
    console.error('Clear cart error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
