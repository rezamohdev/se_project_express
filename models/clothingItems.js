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
    }
});

const clothingItems = new mongoose.Schema({
    name: { type: String, required: true },
    weather: { type: String, required: true, enum: ['cold', 'warm', 'hot'] },
    imageUrl: {
        type: String, required: true,
        validate: {
            validator(value) {
                return validator.isURL(value);
            },
            message: 'You must enter a valid URL',
        }
    },
    owner: mongoose.Schema.Types.ObjectId,
    likes: [],
    createdAt: Date.now
});

module.exports = mongoose.model('clothingItem', clothingItems);
module.exports = mongoose.model('user', User);