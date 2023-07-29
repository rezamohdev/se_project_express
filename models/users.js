const mongoose = require('mongoose');
const validator = require('validator');


const User = new mongoose.Schema({
    name: { type: String, required: true, minLength: 2, maxLength: 30 },
    avatar: {
        type: String, required: true,
        validate: {
            validator(value) {
                return validator.isURL(value);
            },
            message: 'You must enter a valid URL',
        }
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator(value) {
                return validator.isEmail(value);
            },
            message: 'You must enter a valid Email',

        }
    },
    password: {
        type: String,
        required: true,
    }
});

userSchema.statics.findUserByCredentials = function (email, password) {
    return this.findOne({ email })
        .then((user) => {
            if (!user) {
                return Promise.reject(new Error('Incorrect password or email'));
            }

            return bcrypt.compare(password, user.password)
                .then((matched) => {
                    if (!matched) {
                        return Promise.reject(new Error('Incorrect password or email'));
                    }

                    return user;
                });
        });
};
module.exports = mongoose.model('users', User);
