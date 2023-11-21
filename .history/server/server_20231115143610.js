import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDatabase from "./config/MongoDb.js";
import ImportData from "./DataImport.js";
import productRouter from "./Routes/ProductRoutes.js";
import { errorHandler, notFound } from "./Middleware/Errors.js";
import userRouter from "./Routes/UserRoutes.js";
import orderRouter from "./Routes/OrderRoutes.js";
import categorieRoute from "./Routes/CategorieRoutes.js";
import nodemailer from "nodemailer";
import { EMAIL, PASSWORD } from "../env.js";

dotenv.config();
connectDatabase();
const app = express();
app.use(express.json());

// Utilisez CORS middleware
app.use(cors());

// Utilisez NODEMAILER
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL,
    pass: PASSWORD,
  },
});

app.get("/envoyer-email", (req, res) => {
  const mailOptions = {
    from: "votre-email@gmail.com",
    to: "nilaso4744@nexxterp.com",
    subject: "Sujet de l'email",
    text: "Contenu de l'email",
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.send(error.toString());
    }
    res.send("Email envoyé : " + info.response);
  });
});

// API
app.use("/api/import", ImportData);
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/categories", categorieRoute);
app.use("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

//  ERROR HANDLER
app.use(notFound);
app.use(errorHandler);

// app.get("/", (req, res) => {
//   res.send("Api is Running ...");
// });

const PORT = process.env.PORT || 1000;
app.listen(PORT, console.log(`server run in port ${PORT}`));
