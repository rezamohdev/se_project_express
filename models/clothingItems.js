const mongoose = require('mongoose');
const validator = require('validator');





const clothingItem = new mongoose.Schema({
    name: { type: String, required: true, minLength: 2, maxLength: 30 },
    weather: { type: String, required: true, enum: ['col', 'warm', 'hot'] },
    imageUrl: {
        type: String, required: true,
        validate: {
            validator(value) {
                return validator.isURL(value);
            },
            message: 'You must enter a valid URL',
        }
    },
    owner: { type: mongoose.Schema.Types.ObjectId, required: true },
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