const clothingItem = require('../models/clothingItems');
const { handleError } = require('../utils/config');
const UnauthorizedError = require('../errors/unauthorized-err');

// PUT / items /: itemId / likes — like an item
module.exports.likeItem = (req, res, next) => {
    clothingItem.findByIdAndUpdate(
        req.params.itemId,
        { $addToSet: { likes: req.user._id } },
        { new: true }
    )
        .orFail()
        .then((data) => res.status(200).send(data))
        .catch(() => {
            next(new UnauthorizedError('You are not allowed to make change'))
        })

    // .catch((err) => {
    //     handleError(req, res, err);
    // });
}

// DELETE / items /: itemId / likes — unlike an item
module.exports.dislikeItem = (req, res, next) => {
    clothingItem.findByIdAndUpdate(
        req.params.itemId,
        { $pull: { likes: req.user._id } }, // remove _id from the array
        { new: true },
    ).orFail()
    .then((data) => res.status(200).send(data))
    .catch(() => {
        next(new UnauthorizedError('You are not allowed to make change'))
    })
}
// .catch((err) => {
//     handleError(req, res, err);
// })