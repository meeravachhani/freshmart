// const mongoose = require("mongoose");

// const productSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, "Product name is required"],
//     trim: true,
//     minlength: 2
//   },

//   category: {
//     type: String,
//     required: [true, "Category is required"]
//   },

//   price: {
//     type: Number,
//     required: [true, "Price is required"],
//     min: [1, "Price must be greater than 0"]
//   },

//   quantity: {
//     type: Number,
//     required: true,
//     min: [0, "Quantity cannot be negative"]
//   },

//   description: {
//     type: String,
//     maxlength: 500
//   },

//   image: {
//     type: String,
//     required: true
//   },

//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// module.exports = mongoose.model("Product", productSchema);





const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
    trim: true,
    minlength: 2,
  },

  category: {
    type: String,
    required: [true, "Category is required"],
  },

  price: {
    type: Number,
    required: [true, "Price is required"],
    min: [1, "Price must be greater than 0"],
  },

  quantity: {
    type: Number,
    required: true,
    min: [0, "Quantity cannot be negative"],
  },

  description: {
    type: String,
    maxlength: 500,
  },

  image: {
    type: String,
    required: true,
  },

  // 🔥 OFFER FIELDS (NEW)
  isOffer: {
    type: Boolean,
    default: false,
  },

  offerTag: {
    type: String, // example: "fresh-vegetables", "fruits-offer"
    default: "",
  },
  // 🔥 NEW: DISCOUNT PERCENTAGE

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
