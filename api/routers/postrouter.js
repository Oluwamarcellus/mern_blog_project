import express from "express";
import authenticator from "../controllers/authenticator.js";
import createPost from "../controllers/createpost.js";
import getpost from "../controllers/getpost.js";
import { deletePost } from "../controllers/deletepost.js";

const router = express.Router();

router.post("/create", authenticator, createPost);
router.get("/getpost", getpost);
router.delete("/deletepost/:postId", authenticator, deletePost);

export default router;