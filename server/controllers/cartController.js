const Cart = require("../models/Cart");

// Add or update cart item
const addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    // Check if product already in cart
    const existing = await Cart.findOne({ userId, productId });

    if (existing) {
      // Update quantity
      existing.quantity += quantity;
      await existing.save();
      return res.json({ message: "Quantity updated", cartItem: existing });
    }

    const newItem = await Cart.create({ userId, productId, quantity });
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all cart items for a user
const getCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const cartItems = await Cart.find({ userId });
    res.json(cartItems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update quantity of a cart item
const updateCartItem = async (req, res) => {
  const { userId, productId } = req.params;
  const { quantity } = req.body;

  try {
    const item = await Cart.findOne({ userId, productId });
    if (!item) return res.status(404).json({ message: "Item not found" });

    item.quantity = quantity;
    await item.save();

    res.json({ message: "Quantity updated", cartItem: item });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Remove item from cart
const removeFromCart = async (req, res) => {
  const { userId, productId } = req.params;

  try {
    const deleted = await Cart.findOneAndDelete({ userId, productId });
    if (!deleted) return res.status(404).json({ message: "Item not found" });

    res.json({ message: "Item removed from cart" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Clear full cart
const clearCart = async (req, res) => {
  const { userId } = req.params;

  try {
    await Cart.deleteMany({ userId });
    res.json({ message: "Cart cleared" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addToCart,
  getCart,
  updateCartItem,
  removeFromCart,
  clearCart,
};
