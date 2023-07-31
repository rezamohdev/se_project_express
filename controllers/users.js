const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const { handleError, JWT_SECRET } = require('../utils/config');

const getCurrentUser = (req, res) => {
    const { userId } = req.user._id;
    console.log(userId);
    User.findById(userId)
        .orFail()
        .then((data) => {
            res.status(200).send(data);
        }).catch((err) => {
            handleError(req, res, err);
        })
}

// POST /users — creates a new user
const createUser = (req, res) => {
    const { name, avatar, email, password } = req.body;
    console.log(name, avatar);
    User.findOne({ email }).then((user) => {
        if (!user) {
            bcrypt.hash(password, 10).then((hash) => {
                User.create({ name, avatar, email, password: hash })
                    .then((data) => { res.status(201).send(data) })
                    .catch((err) => { handleError(req, res, err); });
            });
        }
    }).catch((err) => {
        console.log(err);
        throw new Error('This email address is already registered! please try another one.')
    });

};
const updateProfile = (req, res) => {
    const { userId, } = req.params;
    const { name, avatar } = req.body;
    User.findByIdAndUpdate(userId, { $set: { name, avatar } }, { new: true, runValidators: true })
        .orFail()
        .then((data) => { res.send(data) }).catch((err) => {
            console.log(err);
            throw new Error('This email address is already registered! please try another one.')
        });
}

const login = (req, res) => {
    const { email, password } = req.body;
    return User.findUserByCredentials(email, password).
        then((user) => {
            res.send({
                token: jwt.sign({ _id: user._id }, JWT_SECRET, {
                    expiresIn: "7d",
                })
            });
        })
        .catch((err) => {
            res.status(401).send({ message: err.message });
        });
};



module.exports = { getUsers, createUser, getUser, login, updateProfile, getCurrentUser }