const clothingItem = require('../models/clothingItems');
// const User = require('../models/users');
const { handleError } = require('../utils/config');
const { ERROR_403 } = require('../utils/errors');
const UnauthorizedError = require('../errors/unauthorized-err');
const NotFoundError = require('../errors/not-found-err');
// GET / items — returns all clothing items
const getClothingItem = (req, res, next) => {
    clothingItem.find({})
        .then((data) => {
            res.status(200).send(data);
        })
        .catch(() => {
            next(new NotFoundError('You are not allowed to make change'))
        })

    // .catch((err) => {
    //     handleError(req, res, err);
    // });
}
// POST / items — creates a new item
const createClothingItem = (req, res, next) => {
    console.log('user id: ', req.user._id);
    // console.log(req.body);
    const { name, weather, imageUrl } = req.body;
    clothingItem.create({ name, weather, imageUrl, owner: req.user._id })
        .then((data) => {
            res.status(200).send(data);
        })
        .catch(() => {
            next(new UnauthorizedError('You are not allowed to make change'))
        })
    // catch((err) => {
    //     console.error(err);
    //     handleError(req, res, err);

    // });
}
// DELETE / items /: itemId — deletes an item by _id
const deleteClothingItem = (req, res, next) => {
    const { itemId } = req.params;
    const loggedinUserId = req.user._id;
    clothingItem.findOne({ _id: itemId })
        .orFail()
        .then((item) => {
            // check if the user is the item owner
            if (item.owner.equals(loggedinUserId)) {
                console.log('owner is confirmed!')
                clothingItem.findByIdAndDelete(itemId)
                    .orFail()
                    .then((data) => {
                        res.status(200).send(data.toJSON());
                    }).catch((err) => {
                        console.error(err);
                        // res.status(500).send(`An error has occurred on the server: `);
                        handleError(req, res, err);
                    });
            } else {
                res.status(ERROR_403).send({ message: 'You are not authrized to delete other user\'s item' });
            }
        })
        .catch(() => {
            next(new UnauthorizedError('You are not allowed to make change'))
        })
    // .catch((err) => {
    //     handleError(req, res, err);
    // })


}

module.exports = { getClothingItem, createClothingItem, deleteClothingItem };