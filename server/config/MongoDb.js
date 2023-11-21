import mongoose from "mongoose";

//Connexion à MongoDB
//dotenv.config();

const connectDatabase = async () => {
  try {
    const connection = await mongoose.connect(process.env.MongoDB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "shoeshopDatabase",
    });
    console.log("Mogo Connected ");
  } catch (error) {
    console.log(` Error : ${error.message}`);
    process.exit(1);
  }
};

export default connectDatabase;
