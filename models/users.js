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
    }
});
module.exports = mongoose.model('User', User);
