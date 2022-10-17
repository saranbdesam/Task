const UserDB = require('../model/user.model');
const bcrypt = require('bcrypt');
const { errorMsgFormat, sucessFormat } = require('../utilities/msgFormat')
require('dotenv').config();
const JWT = require('jsonwebtoken');



class User {
    //<--** Create new user using Email and password **-->
    async createUser(req, res) {
        try {
            let data = await UserDB.findOne({ email: req.body.email })
            if (data) return res.status(400).send(errorMsgFormat({ message: `${req.body.email} already exist..` }));
            let makepassword = await bcrypt.genSalt(10);
            await new UserDB({
                name: req.body.name,
                email: req.body.email,
                password: await bcrypt.hash(req.body.password, makepassword)
            }).save();
            return res.status(200).send(sucessFormat(`${req.body.email} Created sucessfully..`));
        } catch (error) {
            return res.status(400).send(errorMsgFormat(error));
        }
    }
    //<--** Log-In with Email and Password **-->
    async login(req, res) {
        try {
            let data = await UserDB.findOne({ email: req.body.email });
            if (!data) return res.status(400).send(errorMsgFormat({ message: 'Email or password incorrect..' }))
            let passwordcompare = await bcrypt.compare(req.body.password, data.password);
            if (!passwordcompare) return res.status(400).send(errorMsgFormat({ message: 'Email or password incorrect..' }))
            else {
                return res.status(200).send(sucessFormat({
                    token: await this.createToken(data)
                }))
            }
        }
        catch (err) {
            return res.status(400).send(errorMsgFormat(err))
        }
    }
    //<--** Create Authentication token using id and Email **-->
    async createToken(data) {
        try {
            let payload = {
                id: data._id,
                email: data.email
            }
            let token = JWT.sign(payload, process.env.SECRET)
            let tokenPayload = {
                user: data._id,
                token: token
            }
            return tokenPayload;
        } catch (error) {
            return error;
        }
    }

}
module.exports = new User;