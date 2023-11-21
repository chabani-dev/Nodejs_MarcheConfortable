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
    const { name, description, image } = req.body;

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
          product: req.product._id,
          user: req.user._id,
        });
        res.status(201).json(createdCategorie);
      } catch (error) {
        res.status(400).json({ message: "Invalid categorie data" });
      }
    }
  })
);

export default categorieRoute;
