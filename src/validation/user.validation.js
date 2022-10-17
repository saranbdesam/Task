const joi = require('joi');


exports.signupValidation = (req) => {
        let schema = joi.object().keys({
            name: joi.string().min(4).max(256).required(),
            email: joi.string().min(4).max(256).email().required(),
            password: joi.string().min(4).max(256).required(),
            confirm_password: joi.string().valid(joi.ref('password')).required()
            .label("confirm_password").options({messages:{'any.only': '{{#label}} does not match'} })
        })
        return schema.validate(req, { abortEarly: false })
}
exports.signinValidation=(req)=>{
    let schema = joi.object().keys({
        email: joi.string().min(4).max(256).email().required(),
        password: joi.string().min(4).max(256).required()
    })
    return schema.validate(req,{abortEarly:false})
}
