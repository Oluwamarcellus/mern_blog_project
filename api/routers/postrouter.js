import express from "express";
import authenticator from "../controllers/authenticator.js";
import createPost from "../controllers/createpost.js";
import getpost from "../controllers/getpost.js";

const router = express.Router();

router.post("/create", authenticator, createPost);
router.get("/getpost", getpost);

export default router;