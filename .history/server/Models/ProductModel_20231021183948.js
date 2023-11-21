import mongoose from "mongoose";

const reviewScheme = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  rating: {
    type: Number,
    required: true,
  },

  comment: {
    type: String,
    required: true,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});
const productShema = mongoose.Schema.Types.ObjectId(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      default: new mongoose.Types.ObjectId(), // Vous pouvez définir une valeur par défaut si nécessaire
    },

    name: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    reviews: [reviewScheme],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },

    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productShema);

export default Product;