const User = require('../models/users');
const handleError = require('../utils/config');

// GET /users — returns all users
const getUsers = (req, res) => {
    // console.log(req);
    // console.log('request body:', req.body);
    User.find({})
        .orFail()
        .then((users) => {
            res.status(200).send(users);
        }).catch((err) => {
            // res.status(500).send({ message: 'get users faild, error : ', err })
            handleError(req, res, err);
        })
}

// GET /users/:userId - returns a user by _id
const getUser = (req, res) => {
    const { userId } = req.params;
    User.findById(userId)
        .then((data) => {
            console.log(userId);
            res.send(data)
        }).
        catch((err) => {
            console.error(err);
            // res.status(500).send('Failed finding user by id, error :', err)
            handleError(req, res, err);

        });
}
// POST /users — creates a new user
const createUser = (req, res) => {
    // console.log('req', req);
    // console.log('request body:', req.body);

    const { name, avatar } = req.body;
    console.log(name, avatar);
    User.create({ name, avatar })
        .then((data) => { res.send(data) })
        .catch((err) => {
            // res.status(500).send('Failed creating user', err)
            // res.status(500).send('Failed creating user', err);
            handleError(req, res, err);

        });
}

module.exports = { getUsers, createUser, getUser }