import User from "../models/userschema.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

const googleauth = async (req, res, next) => {
  const { name, email, imageUrl } = req.body;
  if (!name || !email) {
    return next(errHandler("Incomplete Credentials", 400));
  }
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      const token = jwt.sign(
        { id: user._id, anAdmin: user.anAdmin },
        process.env.JWT_SECRET
      );
      const { password: passw, ...others } = user.toObject();

      res
        .status(200)
        .cookie("sessiontoken", token, { httpOnly: true })
        .json({ user: others });
    } else {
      const userName =
        name.toLowerCase().split(" ").join("") +
        Math.random().toString().slice(-5);
      const passwrd =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(passwrd, 10);
      const newUser = new User({
        username: userName,
        email: email,
        password: hashedPassword,
        imageUrl: imageUrl || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj1oiE43HHkzp6UW8hwT9F_dLDsMK7lNRE7g&usqp=CAU",
      });
      await newUser.save();
      const token = jwt.sign(
        { id: newUser._id, anAdmin: newUser.anAdmin },
        process.env.JWT_SECRET
      );
      const { password: passw, ...others } = newUser.toObject();
      res
        .status(200)
        .cookie("sessiontoken", token, { httpOnly: true })
        .json({ user: others });
    }
  } catch (err) {
    next(err);
  }
};

export default googleauth;
