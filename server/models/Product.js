const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PRODUCT = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, default: 1, min: 0 },
    category: { type: String, required: true },
    images: [String],
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isActive: { type: Boolean, default: true },
    tags: [String], // optional
    unit: { type: String }, // optional: "kg", "pcs"
    discount: { type: Number, default: 0 }, // optional
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", PRODUCT);
