const User = require('../models/users');

// GET /users — returns all users
const getUsers = (req, res) => {
    // console.log(req);
    // console.log('request body:', req.body);
    User.find({}).then((users) => {
        res.status(200).send(users);
    }).catch((err) => {
        res.status(500).send({ message: 'get users faild', err })
    })
}

// GET /users/:userId - returns a user by _id
const findUser = (req, res) => {
    const { id } = req.params.id;
    User.findById(id).
        then((data) => {
            console.log(id);
            console.log(data); res.send(data)
        }).
        catch((err) => {
            res.status(500).send('Failed creating user', err)
        })
}
// POST /users — creates a new user
const createUser = (req, res) => {
    // console.log('req', req);
    // console.log('request body:', req.body);

    const { name, avatar } = req.body;
    console.log(name, avatar);
    User.create({ name, avatar })
        .then((data) => { console.log(data); res.send(data) })
        .catch((err) => {
            res.status(500).send('Failed creating user', err)
        })
}

module.exports = { getUsers, createUser, findUser }