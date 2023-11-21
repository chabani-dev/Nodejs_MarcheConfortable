import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userShema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: { type: String, required: true },

    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// LOGIN

userShema.methods.matchPassword = async function (enterPassword) {
  return await bcrypt.compare(enterPassword, this.password);
};

//register
// userShema.pre("save", async function (next) {
//   if (!this.isModified("password")) {
//     return next(); // Pas de modification du mot de passe, pas besoin de hacher à nouveau
//   }

//   try {
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(this.password, salt);
//     this.password = hashedPassword;
//     return next(); // Continuer la sauvegarde avec le mot de passe haché
//   } catch (error) {
//     return next(error); // Gérer les erreurs
//   }
// });

//register
userShema.pre("save", async function (next) {
  if (this.isModified("password")) {
    try {
      const hashedPassword = await bcrypt.hash(this.password, 10);
      this.password = hashedPassword;
    } catch (error) {
      return next(error); // Gérer les erreurs de hachage
    }
  }
  next();
});

const User = mongoose.model("User", userShema);

export default User;
