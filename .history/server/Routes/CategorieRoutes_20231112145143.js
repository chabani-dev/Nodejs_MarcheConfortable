import express from "express";
import asyncHandler from "express-async-handler";
import Categorie from "../Models/CategorieModel";
import { protect } from "../Middleware/AuthMiddleware.js";

// CREATE PRODUCT
categorieRoute.post(
  "/",
  protect,

  asyncHandler(async (req, res) => {
    const { name, description, image } = req.body;

    // Validation des données ici si nécessaire

    const categorieExist = await Categorie.findOne({ name });
    if (categorieExist) {
      res.status(400).json({ message: "Categorie name already exists" });
    } else {
      const categorie = new Categorie({
        name,
        price,
        description,
        image,
        user: req.user._id,
      });

      try {
        const createdCategorie = await Categorie.save();
        res.status(201).json(createdCategorie);
      } catch (error) {
        res.status(400).json({ message: "Invalid categorie data" });
      }
    }
  })
);
