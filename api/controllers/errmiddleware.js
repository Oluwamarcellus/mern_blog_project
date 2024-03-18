const errMiddleware = (err, req, res, next) => {
    const msg = err.message || "Internal Server Error";
    const code = err.code || 500;
    res.status(code).json({
        error: msg,
        statusCode: code
    });
}

export default errMiddleware;