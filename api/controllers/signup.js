import errHandler from "./errhandler.js";
import User from "../models/userschema.js";
import bcryptjs from "bcryptjs";

const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return next(errHandler("Incomplete Credentials", 400));
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username: username, email: email, password: hashedPassword });
  try {
    await newUser.save();
    return res.status(200).json({ message: "User Added Successfully" });
  } catch (err) {
    return next(err);
  }
};

export default signup;
