import express from "express";
import asyncHandler from "express-async-handler";
import Categorie from "../Models/CategorieModel.js";
import { protect, admin } from "../Middleware/AuthMiddleware.js";

const categorieRoute = express.Router();

// CREATE Categorie
categorieRoute.post(
  "/",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const { name, description, image, productId } = req.body;

    // Validation des données ici si nécessaire

    const categorieExist = await Categorie.findOne({ name });
    if (categorieExist) {
      res.status(400).json({ message: "Categorie name already exists" });
    } else {
      try {
        const createdCategorie = await Categorie.create({
          name,
          description,
          image,
          product: productId,
          user: req.user._id,
        });
        res.status(201).json(createdCategorie);
      } catch (error) {
        res.status(400).json({ message: "Invalid categorie data" });
      }
    }
  })
);

// GET SINGLE  CATEGORIE
categorieRoute.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const categorie = await Categorie.findById(req.params.id);
    if (categorie) {
      res.json(categorie);
    } else {
      res.status(404);
      throw new Error("product not found");
    }
  })
);

// GET ALL CATEGORIE
categorieRoute.get(
  "/",
  asyncHandler(async (req, res) => {
    try {
      const categories = await Categorie.find({});
      res.json(categories);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  })
);

export default categorieRoute;
