const signout = (req, res, next) => {
    try {
        res.clearCookie("sessiontoken").status(200).json("Signed out sucessfully");
    } catch (err) { 
        next(err);
    }
}
export default signout;