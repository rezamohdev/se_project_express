const clothingItem = require('../models/clothingItems');
const { ERROR_400, ERROR_404, ERROR_500 } = require('../utils/errors');


const handleError = (req, res, error) => {


}

// GET / items — returns all clothing items
const getClothingItem = (req, res) => {
    clothingItem.find({}).
        then((data) => {
            res.status(200).send(data);
        })
        .catch((err) => {
            res.status(500).send(`An error has occurred on the server.: `, err);
        })
}
// POST / items — creates a new item
const createClothingItem = (req, res) => {
    console.log(req.user._id);
    console.log(req.body);
    const { name, weather, imageUrl } = req.body;
    clothingItem.create({ name, weather, imageUrl, owner: req.user._id }).
        then((data) => {
            res.status(200).send(data);
        }).
        catch((err) => {
            console.error(err);
            res.status(500).send(`An error has occurred on the server: `);
        })
}
// DELETE / items /: itemId — deletes an item by _id
const deleteClothingItem = (req, res) => {
    const { itemId } = req.params;
    console.log(itemId);
    clothingItem.findByIdAndDelete(itemId)
        .then((data) => {
            res.status(200).send(data);

        }).catch((err) => {
            console.error(err);
            res.status(500).send(`An error has occurred on the server: `);
        })
}

module.exports = { getClothingItem, createClothingItem, deleteClothingItem };