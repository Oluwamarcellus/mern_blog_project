import express from "express";
import authenticator from "../controllers/authenticator.js";
import { addComment, deleteComment, getComents, likeComment } from "../controllers/comments.js";

const router = express.Router();

router.post("/create", authenticator, addComment);
router.get("/getcomment/:postId", getComents);
router.put("/likecomment/:commentId", authenticator, likeComment);
router.delete("/deletecomment/:commentId", authenticator, deleteComment);

export default router;