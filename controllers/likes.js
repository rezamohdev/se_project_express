const clothingItem = require('../models/clothingItems');

// PUT / items /: itemId / likes — like an item
module.exports.likeItem = (req, res) => {
    clothingItem.findByIdAndUpdate(
        req.params.itemId,
        { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
        { new: true },
        (err, updatedItem) => {
            console.log("test");
            if (err) {
                return res.status(400).json({ message: "An error occurred while liking the item." });
            }
            return res.header('Content-Type', 'application/json').json(updatedItem);
        }
    )
}

// DELETE / items /: itemId / likes — unlike an item
module.exports.dislikeItem = (req, res) => ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } }, // remove _id from the array
    { new: true },
)