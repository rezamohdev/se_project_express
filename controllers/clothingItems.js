const clothingItem = require('../models/clothingItems');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ForbiddenError = require('../errors/forbidden-err');
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
            res.send(data);
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
                new ForbiddenError('You are not authrized to delete other user\'s item');
            }
        })
        .catch((err) => next(err))


}

module.exports = { getClothingItem, createClothingItem, deleteClothingItem };