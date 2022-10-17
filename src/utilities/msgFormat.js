exports.errorFormat = (error) => {
    let errors = {};
    //console.log("test",error.details);
    if (error.details) {
        error.details.forEach((detail) => {
            errors[detail.path] = detail.message;
        });
    }
    else errors = error;
    //console.log(errors);
    return this.errorMsgFormat({ message: errors }, "Admin", 400)
};
exports.errorMsgFormat = (err, data, code) => {
    //console.log("err");
    return {
        "code": code,
        "errors": true,
        "data": data,
        "message": err.message
    }
};
exports.sucessFormat = (res, code = 200) => {
    return {
        "code": code,
        "errors": false,
        "data": res
    }
};