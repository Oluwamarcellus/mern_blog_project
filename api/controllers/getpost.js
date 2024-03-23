import Post from "../models/postschema.js";

const getpost = async (req, res, next) => { 
    try {
        const offset = req.query.offset || 0;
        const limit = req.query.limit || 10;
        const sortBy = req.query?.sortBy && req.query.sortBy === 'asc' ? 1 : -1;

        const posts = await Post.find({
            ...(req.query?.postId && { _id: req.query.postId }),
            ...(req.query?.userId && { userId: req.query.userId }),
            ...(req.query?.searchterm && {
                $or: [
                    { title: { $regex: req.query.searchterm, $options: 'i' } },
                    { content: { $regex: req.query.searchterm, $options: 'i' } }
                ]
            }),
        }).sort({ updatedAt: sortBy }).skip(offset).limit(limit);
        
        const now = new Date();
        const lastMonth = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate()
        );

        const totalPosts = await Post.countDocuments();
        const totalPostsLastMonth = await Post.countDocuments({
            createdAt: {$gte: lastMonth},
        });

        res.status(200).json({posts, totalPosts, totalPostsLastMonth});

    } catch (err) {
        next(err);
     }
}

export default getpost;