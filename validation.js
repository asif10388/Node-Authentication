const Joi = require('@hapi/joi');

const registerValidation = (data) =>{
    const validateSchema = Joi.object({
        username: Joi.string().required(),
        email: Joi.string().email(),
        password: Joi.string().min(8).required(),
        discordId:Joi.string(),
        roles:Joi.array().items(Joi.string())
    })

    return validateSchema.validate(data);
}

const loginValidation = (data) =>{
    const validateSchema = Joi.object({
        email: Joi.string().email(),
        password: Joi.string().min(8).required(),
    })

    return validateSchema.validate(data);
}


module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;