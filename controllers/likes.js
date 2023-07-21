const clothingItem = require('../models/clothingItems');
const { handleError } = require('../utils/config');

// PUT / items /: itemId / likes — like an item
module.exports.likeItem = (req, res) => {
    clothingItem.findByIdAndUpdate(
        req.params.itemId,
        { $addToSet: { likes: req.user._id } },
        { new: true }
    )
        .orFail()
        .then((data) => res.status(200).send(data)).catch((err) => {
            handleError(req, res, err);
        });
}

// DELETE / items /: itemId / likes — unlike an item
module.exports.dislikeItem = (req, res) => clothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } }, // remove _id from the array
    { new: true },
).orFail()
    .then((data) => res.status(200).send(data)).catch((err) => {
        handleError(req, res, err);
    })