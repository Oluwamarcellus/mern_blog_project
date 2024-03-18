import errHandler from "./errhandler.js";

const signup = (req, res, next) => {
    console.log(req.body);
    const { username, email, passworld } = req.body;
    if (!username || !email || !passworld) { 
        return next(errHandler("Incomplete Credentials", 400));
    }
    return res.status(200).json({"msg": success});
}

export default signup;