const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
      min: 1,
    },

    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    unit: {
      type: String,
      enum: ["kg", "gram", "liter", "ml", "piece"],
      required: true,
    },
    description: {
      type: String,
      maxlength: 500,
    },

    image: {
      type: String,
      required: true,
    },

    // 🔥 OFFER
    isOffer: {
      type: Boolean,
      default: false,
    },

    offerTag: {
      type: String,
      default: "",
    },

    // 🔥 DISCOUNT %
    discountPercent: {
      type: Number,
      min: 1,
      max: 90,
      default: null,
    },

    // 🔥 AUTO CALCULATED PRICE
    discountPrice: {
      type: Number,
      default: null,
    },

    // ⭐ RATINGS
    ratings: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        value: { type: Number, min: 1, max: 5 },
      },
    ],

    averageRating: { type: Number, default: 0 },
  },
  { timestamps: true }
);

/* 🔥 AUTO CALCULATE OFFER PRICE */
productSchema.pre("save", function () {
  if (this.isOffer && this.discountPercent) {
    this.discountPrice = Math.round(
      this.price - (this.price * this.discountPercent) / 100
    );
  } else {
    this.discountPrice = null;
  }
});


module.exports = mongoose.model("Product", productSchema);


