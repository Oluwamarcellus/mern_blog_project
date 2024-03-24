import Comment from "../models/commentschema.js";
import errHandler from "./errhandler.js";

export const addComment = async (req, res, next) => {
  const { postId, userId, content, userImage, userName } = req.body;
  if (!postId || !userId || !content) {
    next(errHandler("Incomplete credentials", 400));
    return;
  }
  try {
    const newComment = Comment({ postId, userId, content, userImage, userName });
    const data = await newComment.save();
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};

export const getComents = async (req, res, next) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId }).sort({
      createdAt: -1,
    });
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};
