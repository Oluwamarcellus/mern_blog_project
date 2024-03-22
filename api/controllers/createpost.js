import Post from "../models/postschema.js";
import errHandler from "./errhandler.js";

const createPost = async (req, res, next) => {
    console.log(req.user);
  if (!req.user?.anAdmin) {
    next(errHandler("Only Admins are allowed to create post", 403));
  }
  if (!req.body?.title || !req.body?.userId || !req.body?.content) {
    return next(errHandler("Incomplete Required Credentials", 401));
  }
    try {
        const newPost = Post({ ...req.body });
        const data = await newPost.save();
        res.status(201).json({ post: data });
  } catch (err) {
    next(err);
  }
};

export default createPost;
