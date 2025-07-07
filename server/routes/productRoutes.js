const express = require("express");
const router = express.Router();

const {
  getProductsByVendorId,
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  searchProducts,
  deleteProduct,
} = require("../controllers/productController");

// ✅ Then general ones
router.get("/", getAllProducts);
router.get("/search", searchProducts);
router.get("/:id", getProductById);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

// ✅ Specific routes FIRST
router.get("/vendor/:vendorId", getProductsByVendorId);

module.exports = router;
