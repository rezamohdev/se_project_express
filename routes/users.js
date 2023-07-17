const router = require('express').Router();

const { getUsers, createUser, getUser } = require('../controllers/users');
// GET /users — returns all users

router.get('/users', getUsers);

// GET /users/:userId - returns a user by _id
router.get('/users/:userId', getUser);

// POST /users — creates a new user
router.post('/users', createUser)


module.exports = router;