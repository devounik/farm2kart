const express = require("express");
const router = express.Router();
const {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
} = require("../controllers/wishlistController");

// POST: add product to wishlist
router.post("/", addToWishlist);

// DELETE: remove product from wishlist
router.delete("/:userId/:productId", removeFromWishlist);

// GET: fetch all wishlist items for user
router.get("/:userId", getWishlist);

module.exports = router;
