// models/Product.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String },
    description: { type: String },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    brand: { type: String },
    price: { type: Number, default: 0 },
    stock: { type: Number, default: 0 },
    images: [
      {
        url: { type: String },
        altText: { type: String, default: "" },
      },
    ],
    specifications: {
      color: { type: String, default: "" },
      size: { type: String, default: "" },
      weight: { type: Number, default: 0 },
      dimensions: {
        length: { type: Number, default: 0 },
        width: { type: Number, default: 0 },
        height: { type: Number, default: 0 },
      },
    },
    rating: { type: Number, default: 0 },
    reviews: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        comment: { type: String },
        rating: { type: Number },
        createdAt: { type: Date, default: Date.now() },
      },
    ],
    featured: { type: Boolean, default: false },
    tags: { type: [String], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
