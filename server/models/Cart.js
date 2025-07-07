const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Product",
    },
    quantity: { type: Number, required: true, min: 1, default: 1 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
