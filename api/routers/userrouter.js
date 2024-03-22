import express from "express";
import signup from "../controllers/signup.js";
import signin from "../controllers/signin.js";
import signout from "../controllers/signout.js";
import googleauth from "../controllers/googleauth.js";
import authenticator from "../controllers/authenticator.js";
import deleteUser from "../controllers/deleteuser.js";
import updateuser from "../controllers/updateuser.js";


const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/signout", signout);
router.post("/google_auth", googleauth);
router.post("/delete", authenticator, deleteUser);
router.put("/update", authenticator, updateuser);

export default router;