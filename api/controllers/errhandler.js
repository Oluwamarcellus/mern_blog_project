const errHandler = (msg, code) => {
    const err = new Error();
    err.statusCode = code;
    err.message = msg;
    return err;
}

export default errHandler;