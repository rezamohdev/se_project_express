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
module.exports.likeItem = (req, res) => ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
    { new: true },
    (err, updatedItem) => {
        if (err) {
            return res.status(500).json({ error: "An error occurred while liking the item." });
        }
        return res.json(updatedItem); // This will set the correct 'Content-Type' header to 'application/json'
    }
).orFial().catch((err) => {
    handleError(req, res, err);
});
//...

// DELETE / items /: itemId / likes — unlike an item
module.exports.dislikeItem = (req, res) => ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } }, // remove _id from the array
    { new: true },
)
  //...