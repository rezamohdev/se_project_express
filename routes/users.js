const router = require('express').Router();

const { getUsers } = require('../controllers/users');
// GET /users — returns all users

router.get('/users', getUsers);

// GET /users/:userId - returns a user by _id
// POST /users — creates a new user


module.exports = router;