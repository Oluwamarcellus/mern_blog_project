import express from "express";
import authenticator from "../controllers/authenticator.js";
import createPost from "../controllers/createpost.js";

const router = express.Router();

router.post("/create", authenticator, createPost);

export default router;