import Post from "../models/postschema.js";
import errHandler from "./errhandler.js";

export const editPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return next(errHandler("Post not found", 404));
    }
    if (!req.user.anAdmin && req.user.id !== post.userId) {
      return next(errHandler("You are not allowed to update this post", 403));
    }

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.postId,
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
          postImage: req.body.postImage,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
};
