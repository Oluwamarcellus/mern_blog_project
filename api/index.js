import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

const port = process.env.PORT || 3000;
const app = express();

dotenv.config();
/*Connecting to MongoDb*/
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Connected to MongoDB Database Successfully");
    app.listen(port || 3000, () => {
      console.log("Server running on port ", port);
    });
  })
  .catch((err) => console.error(err));


