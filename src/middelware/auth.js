const JWT = require('jsonwebtoken');
const { errorMsgFormat } = require('../utilities/msgFormat');
require('dotenv').config();

//<--** JWT Token verification **-->
const adminAuth = (req, res, next) => {
    try {
        let header = req.headers.authorization;
        if (!header) res.status(400).send(errorMsgFormat({ message: "Token not found..." }))
        const token = JWT.verify(header, process.env.SECRET);
        req.user = token;
        next();
    } catch (error) {
        return res.status(400).send(errorMsgFormat(error));
    }
}

module.exports = adminAuth;