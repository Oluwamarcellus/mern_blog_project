const errMiddleware = (err, req, res, next) => {
    const msg = err.message || "Internal Server Error";
    const code = err.statusCode || 500;
    return res.status(code).json({
        error: msg,
        statusCode: code
    });
}

export default errMiddleware;