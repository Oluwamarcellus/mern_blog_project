import User from "../models/userschema.js";
import bcryptjs from "bcryptjs";

const updateuser = async (req, res, next) => {
    try {
        if (req.body?.password) { 
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }

        const user = await User.findOneAndUpdate(
            { _id: req.user.id },
            req.body,
            { new: true }
        );
        const { password, ...others } = user.toObject();
        res.status(200).json(others);
    } catch (err) {
        next(err);
    }
}

export default updateuser;