const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const { handleError, JWT_SECRET } = require('../utils/config');
const { ERROR_409, ERROR_401 } = require('../utils/errors');
const NotFoundError = require('../errors/not-found-err');

const getCurrentUser = (req, res, next) => {
    const userId = req.user._id;
    console.log(userId);
    User.findById(userId)
        .orFail()
        .then((data) => {
            if (!data) {
                throw new NotFoundError('No user with matching ID found');
            }
        })
        .catch(next)
    // .catch((err) => { handleError(req, res, err); })
}

// POST /users — creates a new user
const createUser = (req, res, next) => {
    const { name, avatar, email, password } = req.body;
    console.log(name, avatar);
    User.findOne({ email }).then((user) => {
        if (!user) {
            bcrypt.hash(password, 10).then((hash) => {
                User.create({ name, avatar, email, password: hash })
                    .then(() => { res.status(201).send({ name, email, avatar }) })
                    .catch((err) => { handleError(req, res, err); });
            });
        } else {
            res.status(ERROR_409).send({ message: 'User already exists' });
        }
    })
        .catch(next)

    // .catch((err) => {
    //     console.log(err);
    //     handleError(req, res, err);

    // });

};
const updateProfile = (req, res, next) => {
    const userId = req.user._id;
    const { name, avatar } = req.body;
    User.findByIdAndUpdate(userId, { $set: { name, avatar } }, { new: true, runValidators: true })
        .orFail()
        .then((data) => { res.send(data) })
        .catch(next)

    // .catch((err) => {
    //     console.log(err);
    //     handleError(req, res, err);

    // });
}

const login = (req, res, next) => {
    const { email, password } = req.body;
    return User.findUserByCredentials(email, password).
        then((user) => {
            res.send({
                token: jwt.sign({ _id: user._id }, JWT_SECRET, {
                    expiresIn: "7d",
                })
            });
        })
        .catch(next)

    // .catch((err) => {
    //     res.status(ERROR_401).send({ message: err.message });
    // });
};



module.exports = { createUser, login, updateProfile, getCurrentUser }