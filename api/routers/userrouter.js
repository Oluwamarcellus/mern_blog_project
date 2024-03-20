import express from "express";
import signup from "../controllers/signup.js";
import signin from "../controllers/signin.js";
import signout from "../controllers/signout.js";
import googleauth from "../controllers/googleauth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/signout", signout);
router.post("/google_auth", googleauth)

export default router;