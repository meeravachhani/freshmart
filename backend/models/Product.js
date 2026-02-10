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
 ratings: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        value: {
          type: Number,
          min: 1,
          max: 5,
        },
      },
    ],
      averageRating: {
      type: Number,
      default: 0,
    },
  

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);








// import mongoose from "mongoose";

// const productSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     description: { type: String },
//     category: {
//       type: String,
//       required: true,
//       // ❌ REMOVE enum to avoid crash with old data
//     },
//     image: { type: String },
//     price: {
//       type: Number,
//       required: true,
//     },

//     // 🔥 OFFER
//     isOffer: {
//       type: Boolean,
//       default: false,
//     },

//     discountPrice: {
//       type: Number,
//       default: null,
//     },

//     discountPercent: {
//       type: Number,
//       default: null,
//     },

//     offerTag: {
//       type: String,
//       default: "",
//     },

//     quantity: {
//       type: Number,
//       default: 1,
//     },

//     // ⭐ RATINGS (SAFE)
//     ratings: {
//       type: [
//         {
//           userId: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "User",
//           },
//           value: Number,
//         },
//       ],
//       default: [],
//     },

//     averageRating: {
//       type: Number,
//       default: 0,
//     },

//     ratingCount: {
//       type: Number,
//       default: 0,
//     },
//   },
//   { timestamps: true }
// );

// // 🔹 AUTO CALCULATE OFFER PRICE
// productSchema.pre("save", function (next) {
//   if (
//     this.isOffer &&
//     this.discountPercent &&
//     !this.discountPrice
//   ) {
//     this.discountPrice = Math.round(
//       this.price - (this.price * this.discountPercent) / 100
//     );
//   }
//   next();
// });

// export default mongoose.model("Product", productSchema);
