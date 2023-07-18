const clothingItem = require('../models/clothingItems');
const { ERROR_400, ERROR_404, ERROR_500 } = require('../utils/errors');


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
        message: 'Passed invalid data !'
    });
}

// GET / items — returns all clothing items
const getClothingItem = (req, res) => {
    clothingItem.find({})
        .orFail(() => {
            const error = new Error("Item ID not found");
            error.statusCode = 404;
            throw error; // Remember to throw an error so .catch handles it instead of .then
        })
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
    clothingItem.create({ name, weather, imageUrl, owner: req.user._id }).
        then((data) => {
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
        .then((data) => {
            res.status(200).send(data);

        }).catch((err) => {
            console.error(err);
            // res.status(500).send(`An error has occurred on the server: `);
            handleError(req, res, err);

        })
}

module.exports = { getClothingItem, createClothingItem, deleteClothingItem };