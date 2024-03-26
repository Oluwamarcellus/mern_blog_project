import User from "../models/userschema.js";

export const getUsers = async (req, res, next) => {
    try { 
        const today = new Date();
        const lastMonth = new Date(
          today.getFullYear(),
          today.getMonth() - 1,
          today.getDate()
        );
        const totalUser = await User.countDocuments();
        const totalUserLastMonth = await User.countDocuments({
          createdAt: {$gte: lastMonth}
        });
    
        res.status(200).json({ totalUser, totalUserLastMonth });
      } catch (err) { 
        next(err);
      }
}