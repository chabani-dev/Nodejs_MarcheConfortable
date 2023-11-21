import express from "express";
import asyncHandler from "express-async-handler";
import Product from "../Models/ProductModel.js";
import { admin, protect } from "./../Middleware/AuthMiddleware.js";

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
    try {
      const products = await Product.find({}).sort({ _id: -1 });

      // Renvoyer les produits au format JSON
      res.json(products);
    } catch (error) {
      // Gérer les erreurs
      console.error("Erreur lors de la récupération des produits :", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
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

export default productRoute;
