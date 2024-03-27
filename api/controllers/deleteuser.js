import User from "../models/userschema.js";

const deleteUser = async (req, res, next) => {
    try { 
        if (req.params.userId !== req.user.id && !req.user.anAdmin) {
            return next(errHandler("Unauthorized to delete", 401));
        }
        await User.findOneAndDelete({ _id: req.params.userId });
        if (req.user.id === req.params.userId) {
            res.status(200).clearCookie("sessiontoken").json({ msg: "Account Deleted Successfully" });
        } else { 
            res.status(200).json({ msg: "Account Deleted Successfully" });
        }
    } catch (err) {
        next(err);
     }  
}

export default deleteUser;