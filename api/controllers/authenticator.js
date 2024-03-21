import jwt from "jsonwebtoken";
import errHandler from "./errhandler.js";

const authenticator = (req, res, next) => { 
    const cookie = req.cookies.sessiontoken;
    if (!cookie) { 
        return next(errHandler("Unauthorized", 401));
    }
    jwt.verify(cookie, process.env.JWT_SECRET, (err, decoded) => { 
        if (err) { 
            return next(errHandler("Unauthorized", 401));
        }
        req.user = decoded;
        next();
    });
}

export default authenticator;