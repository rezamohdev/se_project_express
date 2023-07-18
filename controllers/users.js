const User = require('../models/users');
const { ERROR_400, ERROR_500, ERROR_404 } = require('../utils/errors');



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
        message: 'Passed invalid datam, Faild to create user  !'
    });
}

// GET /users — returns all users
const getUsers = (req, res) => {
    // console.log(req);
    // console.log('request body:', req.body);
    User.find({}).then((users) => {
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
        .orFail(() => {
            const error = new Error("User ID not found");
            error.statusCode = 404;
            throw error; // Remember to throw an error so .catch handles it instead of .then
        })
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
// 64b6a08eb5dd54fcb47dacbd item
//  user
module.exports = { getUsers, createUser, getUser }