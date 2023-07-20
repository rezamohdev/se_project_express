const mongoose = require('mongoose');
const validator = require('validator');





const clothingItem = new mongoose.Schema({
    name: { type: String, required: true, minLength: 2, maxLength: 30 },
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
    likes: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
        default: [],
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('clothingItem', clothingItem);