import express from "express";
import authenticator from "../controllers/authenticator.js";
import { addComment, getComents } from "../controllers/comments.js";

const router = express.Router();

router.post("/create", authenticator, addComment);
router.get("/getcomment/:postId", getComents);

export default router;