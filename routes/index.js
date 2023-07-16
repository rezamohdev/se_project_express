const router = require('express').Router();
const getUsers = require('./users');

router.use('/users', getUsers);

router.use((req, res) => {
    res.status(500).send({ message: 'User not found' });
})


module.exports = router;