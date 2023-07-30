const router = require('express').Router();

const { getUsers, createUser, getUser, getCurrentUser, updateProfile } = require('../controllers/users');

router.get('/users/me', getCurrentUser);
router.patch('/users/me', updateProfile);

module.exports = router;