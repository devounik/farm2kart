const Product = require("../models/Product");
const mongoose = require("mongoose");

const mockVendorId = new mongoose.Types.ObjectId("64eabc1234567890abcdef12");
// 1. Create a new product
const createProduct = async (req, res) => {
  console.log("💡 Incoming Product Data:", req.body); // 👈 Add this
  try {
    const newProduct = await Product.create({
      ...req.body,
      vendorId: mockVendorId,
    });
    res.status(201).json(newProduct);
  } catch (err) {
    console.error("🚨 Validation Error:", err.message); // 👈 Optional
    res.status(400).json({ error: err.message });
  }
};

// 2. Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 3. Get a single product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 4. Update a product
const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ message: "Product not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// 5. Delete a product
const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getProductsByVendorId = async (req, res) => {
  try {
    const { vendorId } = req.params;
    const products = await Product.find({ vendorId });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const searchProducts = async (req, res) => {
  try {
    const { query, category } = req.query;

    const filter = {};
    let projection = null;
    let sort = {};

    // 🔍 Full-text search
    if (query) {
      filter.$text = { $search: query };
      projection = { score: { $meta: "textScore" } };
      sort = { score: { $meta: "textScore" } };
    }

    //  Category filter (case-insensitive)
    if (category) {
      filter.category = { $regex: new RegExp(category, "i") };
    }

    const products = await Product.find(filter, projection).sort(sort);
    res.status(200).json(products);
  } catch (err) {
    console.error("Search error:", err.message);
    res.status(500).json({ error: "Search failed" });
  }
};

module.exports = {
  searchProducts,
  getProductsByVendorId,
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
