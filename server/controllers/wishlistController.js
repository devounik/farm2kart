const Wishlist = require("../models/Wishlist");

// Add to wishlist
const addToWishlist = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    // Prevent duplicates
    const exists = await Wishlist.findOne({ userId, productId });
    if (exists) return res.status(400).json({ message: "Already in wishlist" });

    const entry = await Wishlist.create({ userId, productId });
    res.status(201).json(entry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Remove from wishlist
const removeFromWishlist = async (req, res) => {
  const { userId, productId } = req.params;

  try {
    const deleted = await Wishlist.findOneAndDelete({ userId, productId });
    if (!deleted)
      return res.status(404).json({ message: "Not found in wishlist" });

    res.json({ message: "Removed from wishlist" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all wishlist products for a user
const getWishlist = async (req, res) => {
  const { userId } = req.params;

  try {
    const wishlist = await Wishlist.find({ userId }).populate("productId");
    res.json(wishlist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
};
