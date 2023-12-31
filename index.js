import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./routes/auth.js";
// const bcrypt = require('bcrypt');

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// const corsOption = {
//   origin: ture,
// };
app.get("/", (req, res) => {
  res.send("Doc House API is working");
});

// database connection
mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB database is conneted");
  } catch (error) {
    console.log("MongoDB database is connetion failed");
  }
};

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("api/v1/auth", authRoute);

app.listen(port, () => {
  connectDB();
  console.log("Doc-House Server is running on port" + port);
});
