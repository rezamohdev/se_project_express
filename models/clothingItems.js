const mongoose = require('mongoose');
const validator = require('validator');



const User = new mongoose.Schema({
    name: { type: String, required: true, minLength: 2, maxLength: 30 },
    avatar: {
        type: String, required: true, validate: {
            validator: (v) => validator.isURL(v),
            message: 'Link is not valid'
        }
    }
});

const clothingItems = new mongoose.Schema({
    name: { type: String, required: true },
    weather: { type: String, required: true, enum: ['cold', 'warm', 'hot'] },
    imageUrl: {
        type: String, required: true,
        validate: {
            validator: (v) => validator.isURL(v),
            message: 'Link is not valid'
        }
    },
    owner: mongoose.Schema.Types.ObjectId,
    likes: [],
    createdAt: Date.now
});

module.exports = mongoose.model('clothingItem', clothingItems);
module.exports = mongoose.model('user', User);