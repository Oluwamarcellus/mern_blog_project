const errMiddleware = (err, req, res, next) => {
    const msg = err.errmsg || err.message || "Internal Server Error";
    const code = err.statusCode || 500;
    return res.status(code).json({
        errorMessage: msg,
        statusCode: code
    });
}

export default errMiddleware;