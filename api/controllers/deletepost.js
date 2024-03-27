import Post from "../models/postschema.js";
import errHandler from "./errhandler.js";

export const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return next(errHandler(404, "Post not found"));
    }

    if (req.user.id !== post.userId && !req.user.anAdmin) {
      return next(errHandler("Unauthorized to delete", 403));
    }

    await Post.findOneAndDelete({ _id: req.params.postId });
    res.status(200).json(post);
  } catch (err) {
    next(err);
  }
};
