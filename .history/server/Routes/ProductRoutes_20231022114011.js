import express from "express";
import asyncHandler from "express-async-handler";
import Product from "../Models/ProductModel.js";
import { protect, admin } from "../Middleware/AuthMiddleware.js";

const productRoute = express.Router();

// GET ALL PRODUCT
productRoute.get(
  "/",
  asyncHandler(async (req, res) => {
    const pageSize = 3;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};
    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ _id: -1 });
    res.json({ products, page, pages: Math.ceil(count / pageSize) });
  })
);

// ADMIN GET ALL PRODUCT WITHOUT SEARCH AND PEGINATION
productRoute.get(
  "/all",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({ _id: -1 });
    res.json(products);
  })
);

// GET SINGLE  PRODUCT
productRoute.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error("product not found");
    }
  })
);

// RODUCT REVIEW
// productRoute.post(
//   "/:id/review",
//   protect,
//   asyncHandler(async (req, res) => {
//     const { rating, comment } = req.body;
//     const product = await Product.findById(req.params.id);
//     if (product) {
//       const alreadyReviewed = product.reviews.find(
//         (r) => r.user.toString() === req.user._id.toString()
//       );
//       if (alreadyReviewed) {
//         res.status(400);
//         throw new Error("Product already Reviewed ");
//       }
//       const review = {
//         name: req.user.name,
//         rating: Number(rating),
//         comment,
//         user: req.user._id,
//       };

//       product.reviews.push(review);
//       product.numReviews = product.reviews.length;
//       product.rating =
//         product.reviews.reduce((acc, item) => item.rating + acc, 0) /
//         product.reviews.length;

//       await product.save();
//       res.status(400);
//       throw new Error("Product Abded");
//     } else {
//       res.status(404);
//       throw new Error("product not found");
//     }
//   })
// );

// RODUCT REVIEW
productRoute.post(
  "/:id/review",
  protect,
  asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);
    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );
      if (alreadyReviewed) {
        res.status(400);
        throw new Error("Product already Reviewed");
      }
      const review = {
        name: req.user.name,
        rating: Number(rating), // Conversion en nombre
        comment,
        user: req.user._id,
      };

      if (!isNaN(review.rating)) {
        // La valeur de rating est un nombre valide
        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.rating =
          product.reviews.reduce((acc, item) => item.rating + acc, 0) /
          product.reviews.length;

        await product.save();
        res.status(201).json({ message: "Review Added" });
      } else {
        res.status(400).json({ message: "Invalid rating value" });
      }
    }
  })
);

// DELETE PRODUCT
// productRoute.delete(
//   "/:id",
//   protect,
//   admin,
//   asyncHandler(async (req, res) => {
//     const product = await Product.findById(req.params.id);
//     if (product) {
//       await product.remove();
//       res.json({ message: "Product delete" });
//     } else {
//       res.status(404);
//       throw new Error("product not found");
//     }
//   })
// );

productRoute.delete(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);

      if (!product) {
        res.status(404).json({ message: "Product not found" });
        return;
      }

      await product.remove();
      res.json({ message: "Product deleted" });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  })
);

export default productRoute;
