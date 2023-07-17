const User = require('../models/users');

// GET /users — returns all users
const getUsers = (req, res) => {
    // console.log(req);
    // console.log('request body:', req.body);
    User.find({}).then((users) => {
        res.status(200).send(users);
    }).catch((err) => {
        res.status(500).send({ message: 'get users faild, error : ', err })
    })
}

// GET /users/:userId - returns a user by _id
const findUser = (req, res) => {
    const { userId } = req.params;
    User.findById(userId).
        then((data) => {
            console.log(userId);
            console.log(data); res.send(data)
        }).
        catch((err) => {
            console.error(err);
            res.status(500).send('Failed finding user by id, error :', err)
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