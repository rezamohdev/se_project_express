const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const { handleError, JWT_SECRET } = require('../utils/config');
const { ERROR_409, ERROR_401 } = require('../utils/errors');
const NotFoundError = require('../errors/not-found-err');
const UnauthorizedError = require('../errors/unauthorized-err');

const getCurrentUser = (req, res, next) => {
    const userId = req.user._id;
    User.findById(userId)
        .orFail(() => new NotFoundError('The requested resource Not Found!'))
        .then((data) => {
            if (!data) {
                throw new NotFoundError('No user with matching ID found');
            }
            res.send(data)
        })
        .catch((err) => {
            next(err)
        })
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
                    .catch((err) => {
                        if (err.name === 'ValidationError') {
                            next(new BadRequestError('Invalid data'));
                        } else { next(err); }
                    });
            });
        } else {
            res.status(ERROR_409).send({ message: 'User already exists' });
        }
    })
        .catch((err) => {
            next(err);
        })

};
const updateProfile = (req, res, next) => {
    const userId = req.user._id;
    const { name, avatar } = req.body;
    User.findByIdAndUpdate(userId, { $set: { name, avatar } }, { new: true, runValidators: true })
        .orFail()
        .then((data) => { res.send(data) })
        .catch(() => {
            if (err.name === 'ValidationError') {
                next(new BadRequestError('Invalid data'));
            } else { next(err); }
        })
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
        .catch(() => {
            next(new UnauthorizedError('The Email or user name is wrong: 401'))
        })
};



module.exports = { createUser, login, updateProfile, getCurrentUser }