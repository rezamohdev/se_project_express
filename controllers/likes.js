const clothingItem = require('../models/clothingItems');
const { ERROR_400, ERROR_500, ERROR_404 } = require('../utils/errors');



const handleError = (req, res, error) => {
    console.error(`error is : ${error}`)
    if (error.name === 'ValidationError' || error.name === 'AssertionError') {
        return res.status(ERROR_400).send({
            message: 'Passed invalid data !'
        });
    } else if (error.name === 'CastError') {
        return res.status(ERROR_400).send({
            message: 'The request is sent to a none existense resource!'
        });
    }
    return res.status(ERROR_404).send({
        message: 'Passed invalid data!'
    });
}
// PUT / items /: itemId / likes — like an item
module.exports.likeItem = (req, res) => {
    clothingItem.findByIdAndUpdate(
        req.params.itemId,
        { $addToSet: { likes: req.user._id } },
        { new: true }
    )
        .orFail()
        .then((data) => {
            return res.status(200).send(data);
        }).catch((err) => {
            handleError(req, res, err);
        })
}

// DELETE / items /: itemId / likes — unlike an item
module.exports.dislikeItem = (req, res) => clothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } }, // remove _id from the array
    { new: true },
).orFail()
    .then((data) => {
        return res.status(200).send(data);
    }).catch((err) => {
        handleError(req, res, err);
    })