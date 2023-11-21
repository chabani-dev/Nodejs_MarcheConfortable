import express from "express";
import asyncHandler from "express-async-handler";
import User from "./../Models/UserModel.js";
import generateToken from "../utils/generateToken.js";
import protect from "../Middleware/AuthMiddleware.js";
import bcrypt from "bcryptjs";

const userRouter = express.Router();

// LOGIN
userRouter.post(
  "/login",

  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
        createdAt: user.createdAt,
      });
    } else {
      res.status(401);
      throw new Error("Invalid Email or Password");
    }
  })
);

// PROFILE
userRouter.get(
  "/profile",
  protect,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        createdAt: user.createdAt,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);

// REGISTER
// userRoute.post(
//   "/",
//   asyncHandler(async (req, res) => {
//     try {
//       let user = await User.create(req.body);

//       if (user) {
//         res.status(201).json({
//           _id: user._id,
//           name: user.name,
//           email: user.email,
//           isAdmin: user.isAdmin,
//           token: generateToken(user._id),
//         });
//       } else {
//         res.status(500).json({
//           message:
//             "Une erreur s'est produite lors de la création de l'utilisateur.",
//         });
//       }
//     } catch (err) {
//       if (err.name === "MongoError" && err.code === 11000) {
//         // Erreur de contrainte d'unicité (email en double)
//         res.status(400).json({ message: "Cet email est déjà utilisé." });
//       } else {
//         console.log(err);
//         res.status(500).json({
//           message:
//             "Une erreur s'est produite lors de la création de l'utilisateur.",
//         });
//       }
//     }
//   })
// );

// REGISTER
userRouter.post(
  "/",
  asyncHandler(async (req, res) => {
    try {
      let user = await User.findOne({ email: req.body.email });

      if (user) {
        // L'utilisateur existe déjà, renvoyez une erreur
        res.status(400).json({ message: "User already exists" });
      } else {
        // L'utilisateur n'existe pas, créez-le
        user = await User.create(req.body);

        if (user) {
          res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
          });
        } else {
          res.status(500).json({
            message:
              "Une erreur s'est produite lors de la création de l'utilisateur.",
          });
        }
      }
    } catch (err) {
      if (err.name === "MongoError" && err.code === 11000) {
        // Erreur de contrainte d'unicité (email en double)
        res.status(400).json({ message: "Cet email est déjà utilisé." });
      } else {
        console.log(err);
        res.status(500).json({
          message:
            "Une erreur s'est produite lors de la création de l'utilisateur.",
        });
      }
    }
  })
);

// UPDATE PROFIL
// userRoute.put(
//   "/profile",
//   protect,
//   asyncHandler(async (req, res) => {
//     const user = await User.findById(req.user._id);

//     if (user) {
//       user.name = req.body.name || user.name;
//       user.email = req.body.email || user.email;

//       if (req.body.password) {
//         // Vérifiez l'ancien mot de passe
//         const isPasswordValid = await bcrypt.compare(
//           req.body.oldPassword,
//           user.password
//         );

//         if (!isPasswordValid) {
//           res.status(401);
//           throw new Error("Invalid old password");
//         }

//         // Hachez et mettez à jour le nouveau mot de passe
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(req.body.password, salt);
//         user.password = hashedPassword;
//       }

//       const updateUser = await user.save();
//       res.json({
//         _id: updateUser._id,
//         name: updateUser.name,
//         email: updateUser.email,
//         isAdmin: updateUser.isAdmin,
//         createdAt: updateUser.createdAt,
//         token: generateToken(updateUser._id),
//       });
//     } else {
//       res.status(404);
//       throw new Error("User not found");
//     }
//   })
// );

userRouter.put(
  "/profile",
  protect,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = req.body.password;
      }
      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        createdAt: updatedUser.createdAt,
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);

// GET ALL USER ADMIN

userRouter.get(
  "/",
  protect,
  asyncHandler(async (res, req) => {
    const users = await User.find({});
    res.json(users);
  })
);

export default userRouter;
