const clothingItem = require('../models/clothingItems');
// const User = require('../models/users');
const { handleError } = require('../utils/config');
const { ERROR_403 } = require('../utils/errors');
const UnauthorizedError = require('../errors/unauthorized-err');
const NotFoundError = require('../errors/not-found-err');
// GET / items — returns all clothing items
const getClothingItem = (req, res, next) => {
    clothingItem.find({})
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((err) => next(err))
}
// POST / items — creates a new item
const createClothingItem = (req, res, next) => {
    const { name, weather, imageUrl } = req.body;
    clothingItem.create({ name, weather, imageUrl, owner: req.user._id })
        .then((data) => {
            res.send({ data });
        })
        .catch((err) => {
            if (err.name === 'ValidationError') {
                next(new BadRequestError('Invalid data'));
            } else { next(err); }
        })
}
// DELETE / items /: itemId — deletes an item by _id
const deleteClothingItem = (req, res, next) => {
    const { itemId } = req.params;
    const loggedinUserId = req.user._id;
    clothingItem.findOne({ _id: itemId })
        .orFail(() => new NotFoundError('The requested resource Not Found!'))
        .then((item) => {
            // check if the user is the item owner
            if (item.owner.equals(loggedinUserId)) {
                clothingItem.findByIdAndDelete(itemId)
                    .orFail(() => new NotFoundError('The requested resource Not Found!'))
                    .then((data) => {
                        res.status(200).send(data.toJSON());
                    }).catch((err) => next(err));
            } else {
                res.status(ERROR_403).send({ message: 'You are not authrized to delete other user\'s item' });
            }
        })
        .catch((err) => next(err))


}

module.exports = { getClothingItem, createClothingItem, deleteClothingItem };