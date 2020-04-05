const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    name: String,
    type: String,
    price: Number,
    rating: Number,
    warranty_years: Number,
    available: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", ProductSchema);
