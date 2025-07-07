const express = require("express");
const router = express.Router();
const {
  addToCart,
  getCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} = require("../controllers/cartController");

// POST: Add to cart
router.post("/", addToCart);

// GET: Get user's cart
router.get("/:userId", getCart);

// PUT: Update quantity of item
router.put("/:userId/:productId", updateCartItem);

// DELETE: Remove item
router.delete("/:userId/:productId", removeFromCart);

// DELETE: Clear full cart
router.delete("/:userId", clearCart);

module.exports = router;
