const router = require('express').Router();
const userRouter = require('./users');

router.use('/', userRouter);

router.use((req, res) => {
    res.status(500).send({ message: 'User not found' });
})


module.exports = router;