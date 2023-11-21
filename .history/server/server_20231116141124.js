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
import mail from "./mail.js";

//import { EMAIL, PASSWORD } from "../server/env.js";

dotenv.config();
connectDatabase();
const app = express();
app.use(express.json());

// Utilisez CORS middleware
app.use(cors());

const job = new CronJob({
  cronTime: "*/5 * * * *",
  onTick: sendMail,
});
job.start();

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
