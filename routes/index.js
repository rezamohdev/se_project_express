const router = require('express').Router();
const { getUsers, createUser } = require('./users');

router.use('/users', getUsers);
router.use('/users', createUser);

router.use((req, res) => {
    res.status(500).send({ message: 'User not found' });
})


module.exports = router;