import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routers/userrouter.js";
import postRouter from "./routers/postrouter.js";
import commentrouter from "./routers/commentrouter.js";
import errMiddleware from "./controllers/errmiddleware.js";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import path from "path";


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

const __dirname = path.resolve();

/* Funtional Middlewares*/
app.use(express.json());
app.use(cookieParser());
app.use(morgan('combined'));


/* Routes middlewares*/
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);
app.use("/api/comment", commentrouter);

/* Static Route for frontend (POST BUILD FOR DEPLOYMENT)*/
app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get('*', (req, res, next) => { 
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});

/* Error Middleware */
app.use(errMiddleware)