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
import { CronJob } from "cron";

//import nodemailer from "nodemailer";
//import { EMAIL, PASSWORD } from "../server/env.js";

dotenv.config();
connectDatabase();
const app = express();
app.use(express.json());

// Utilisez CORS middleware
app.use(cors());

const job = new CronJob({
  cronTime: "*/5 * * * *",
  onTick: () => {
    console.log("ok");
  },
  start: true, // Démarre le job immédiatement après sa création
  timeZone: "Europe/Paris", // Spécifiez le fuseau horaire si nécessaire
});
job.start();
// // Utiliser NODEMAILER
// const transporter = nodemailer.createTransport({
//   host: "smtp.ethereal.email",
//   port: 587,
//   secureConnection: false,
//   // tls: {
//   //   ciphers: "SSLv3",
//   // },
//   tls: {
//     rejectUnauthorized: false,
//   },

//   auth: {
//     user: "zerkachabani@gmail.com",
//     pass: "Zarga@0703",
//   },
// });

// const mailOptions = {
//   from: "zerkachabani@gmail.com",
//   to: "nilaso4744@nexxterp.com",
//   subject: "E-mail automatique",
//   text: "Cette email est un email automatique",
// };
// transporter.sendMail(mailOptions, (error, info) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("Email envoyé : " + info.response);
//   }
// });

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
