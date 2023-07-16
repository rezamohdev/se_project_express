const User = require('../models/users');

// GET /users — returns all users
const getUsers = (req, res) => {
    console.log(req);
    console.log(req.body);
    User.find({}).catch((err) => console.error(err))
}

// GET /users/:userId - returns a user by _id
// POST /users — creates a new user

module.exports = { getUsers }