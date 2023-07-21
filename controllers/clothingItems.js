const clothingItem = require('../models/clothingItems');
const handleError = require('../utils/config');
// GET / items — returns all clothing items
const getClothingItem = (req, res) => {
    clothingItem.find({})
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((err) => {
            // res.status(500).send(`An error has occurred on the server.: `, err);
            handleError(req, res, err);
        })
}
// POST / items — creates a new item
const createClothingItem = (req, res) => {
    console.log('user id: ', req.user._id);
    // console.log(req.body);
    const { name, weather, imageUrl } = req.body;
    clothingItem.create({ name, weather, imageUrl, owner: req.user._id })
        .then((data) => {
            res.status(200).send(data);
        }).
        catch((err) => {
            console.error(err);
            // res.status(500).send(`An error has occurred on the server: `);
            handleError(req, res, err);

        })
}
// DELETE / items /: itemId — deletes an item by _id
const deleteClothingItem = (req, res) => {
    const { itemId } = req.params;
    console.log('item id:', itemId);
    clothingItem.findByIdAndDelete(itemId)
        .orFail()
        .then((data) => {
            res.status(200).send(data.toJSON());

        }).catch((err) => {
            console.error(err);
            // res.status(500).send(`An error has occurred on the server: `);
            handleError(req, res, err);

        })
}

module.exports = { getClothingItem, createClothingItem, deleteClothingItem };