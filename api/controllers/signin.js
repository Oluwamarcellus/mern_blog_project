import jwt from "jsonwebtoken";
import errHandler from "./errhandler.js";
import User from "../models/userschema.js";
import bcryptjs from "bcryptjs";

const signin = async (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return next(errHandler("Incomplete Credentials", 400));
  }

  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return next(errHandler("Invalid User Credentials", 401));
    }

    const verPassw = bcryptjs.compareSync(password, user.password);
    if (!verPassw) {
      return next(errHandler("Invalid User Credentials", 401));
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    const { password: passw, ...others } = user.toObject();

    res
      .status(200)
      .cookie("sessiontoken", token, { httpOnly: true })
      .json({ user: others });
  } catch (error) {
    return next(error);
  }
};

export default signin;
