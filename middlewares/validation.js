// middleware/validation.js

const { Joi, celebrate } = require('celebrate');
const validator = require('validator');

const validateURL = (value, helpers) => {
    if (validator.isURL(value)) {
        return value;
    }
    return helpers.error('string.uri');
}

module.exports.validateItemBody = celebrate({
    body: Joi.object().keys({
        name: Joi.string().required().min(2).max(30).messages({
            "string.min": 'The minimum length of the "name" field is 2',
            "string.max": 'The maximum length of the "name" field is 30',
            "string.empty": 'The "name" field must be filled in',
        }),
        imageUrl: Joi.string().required().custom(validateURL).messages({
            "string.empty": 'The "imageUrl" field must be filled in',
            "string.uri": 'the "imageUrl" field must be a valid url',
        }),
        weather: Joi.string().required().valid('Hot', 'Cold', 'Warm')
    }),
});


module.exports.validateUserInfoBody = celebrate({
    body: Joi.object().keys({
        name: Joi.string().required().min(2).max(30).messages({
            "string.min": 'The minimum length of the "name" field is 2',
            "string.max": 'The maximum length of the "name" field is 30',
            "string.empty": 'The "name" field must be filled in',
        }),
        avatar: Joi.string().required().custom(validateURL).messages({
            "string.empty": 'The "imageUrl" field must be filled in',
            "string.uri": 'the "imageUrl" field must be a valid url',
        }),
        email: Joi.string().required().email().messages({
            "string.empty": 'The "email" field must be filled in',
            "string.email": 'the "email" field must be a valid email',
        }),
        password: Joi.string().required()
    })
})
// module.exports.validateCardBody = celebrate({
//     body: Joi.object.keys({
//         name: Joi.string().required().min(2).max(30).messages({
//             "string.min": 'The minimum length of the "name" field is 2',
//             "string.max": 'The maximum length of the "name" field is 30',
//             "string.empty": 'The "name" field must be filled in',
//         }),

//         imageUrl: Joi.string().required().custom(validateURL).messages({
//             "string.empty": 'The "imageUrl" field must be filled in',
//             "string.uri": 'the "imageUrl" field must be a valid url',
//         }),
//     }),
// });