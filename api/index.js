import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routers/userrouter.js";
import errMiddleware from "./controllers/errmiddleware.js";
import cookieParser from "cookie-parser";

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

/* Funtional Middlewares*/
app.use(express.json());
app.use(cookieParser());


/* Routes middlewares*/
app.use("/api/user", userRouter);

/* Error Middleware */
app.use(errMiddleware)