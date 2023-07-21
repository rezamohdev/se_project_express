const User = require('../models/users');
const handleError = require('../utils/config');

// GET /users — returns all users
const getUsers = (req, res) => {
    User.find({})
        .then((users) => {
            res.status(200).send(users);
        }).catch((err) => {
            handleError(req, res, err);
        })
}

// GET /users/:userId - returns a user by _id
const getUser = (req, res) => {
    const { userId } = req.params;
    User.findById(userId)
        .orFail(() => {

            const error = new Error("User ID not found");

            error.statusCode = 404;

            throw error; // Remember to throw an error so .catch handles it instead of .then 

        })
        .then((data) => {
            res.status(200).send(data);
        }).
        catch((err) => {
            console.error(err);
            handleError(req, res, err);

        });
}
// POST /users — creates a new user
const createUser = (req, res) => {
    const { name, avatar } = req.body;
    console.log(name, avatar);
    User.create({ name, avatar })
        .then((data) => { res.send(data) })
        .catch((err) => {
            handleError(req, res, err);
        });
}

module.exports = { getUsers, createUser, getUser }