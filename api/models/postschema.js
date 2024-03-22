import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: String,
        required: true, 
    },
    totalLikes: {
        type: Number,
        default: 0
    },
    content: {
        type: String,
        required: true
    },
    postImage: {
        type: String,
        default: "https://img.freepik.com/free-vector/blogging-fun-content-creation-online-streaming-video-blog-young-girl-making-selfie-social-network-sharing-feedback-self-promotion-strategy_335657-2386.jpg"
    }
}, { timestamps: true });

const Post = mongoose.model("Post", postSchema);
export default Post;