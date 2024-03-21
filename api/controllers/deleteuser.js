import User from "../models/userschema.js";

const deleteUser = async (req, res, next) => {
    try { 
        const userObj = req.user;
        await User.findOneAndDelete({ _id: userObj.id });
        res.status(200).clearCookie("sessiontoken").json({msg: "Account Deleted Successfully"});
    } catch (err) {
        next(err);
     }  
}

export default deleteUser;