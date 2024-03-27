import Comment from "../models/commentschema.js";
import errHandler from "./errhandler.js";

export const addComment = async (req, res, next) => {
  const { postId, userId, content, userImage, userName } = req.body;
  if (!postId || !userId || !content) {
    next(errHandler("Incomplete credentials", 400));
    return;
  }
  try {
    const newComment = Comment({
      postId,
      userId,
      content,
      userImage,
      userName,
    });
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

export const likeComment = async (req, res, next) => {
  try {
    const comment = await Comment.findOne({ _id: req.params.commentId });
    if (!comment) {
      return next(errHandler("Comment does not exist", 404));
    }
    const userId = req.user.id;

    if (comment.likes.includes(userId)) {
      comment.likes = comment.likes.filter((ids) => ids != userId);
      comment.totalLikes -= 1;
    } else {
      comment.likes.push(userId);
      comment.totalLikes += 1;
    }
    await comment.save();
    res.status(201).json(comment);
  } catch (err) {
    next(err);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return next(errHandler(404, "Comment not found"));
    }

    if (req.user.id !== comment.userId && !req.user.anAdmin) {
      return next(errHandler("Unauthorized to delete", 403));
    }

    await Comment.findOneAndDelete({ _id: req.params.commentId });
    res.status(200).json(comment);
  } catch (err) {
    next(err);
  }
};


export const getAllComents = async (req, res, next) => { 
  try { 
    const today = new Date();
    const lastMonth = new Date(
      today.getFullYear(),
      today.getMonth() - 1,
      today.getDate()
    );
    const comments = await Comment.find().sort({ createdAt: -1 });
    const totalComment = await Comment.countDocuments();
    const totalCommentLastMonth = await Comment.countDocuments({
      createdAt: {$gte: lastMonth}
    });

    res.status(200).json({ comments, totalComment, totalCommentLastMonth });
  } catch (err) { 
    next(err);
  }
}