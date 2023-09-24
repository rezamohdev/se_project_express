const clothingItem = require('../models/clothingItems');
const NotFoundError = require('../errors/not-found-err');

// PUT / items /: itemId / likes — like an item
module.exports.likeItem = (req, res, next) => {
    clothingItem.findByIdAndUpdate(
        req.params.itemId,
        { $addToSet: { likes: req.user._id } },
        { new: true }
    )
        .orFail(() => new NotFoundError('The requested resource Not Found!'))
        .then((data) => res.status(200).send(data))
        .catch((err) => {
            next(err)
        })
}

// DELETE / items /: itemId / likes — unlike an item
module.exports.dislikeItem = (req, res, next) => {
    clothingItem.findByIdAndUpdate(
        req.params.itemId,
        { $pull: { likes: req.user._id } }, // remove _id from the array
        { new: true },
    ).orFail(() => new NotFoundError('The requested resource Not Found!'))
        .then((data) => res.status(200).send(data))
        .catch((err) => next(err))
}