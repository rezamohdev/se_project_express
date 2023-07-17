const router = require('express').Router();
const userRouter = require('./users');
const itemRouter = require('./clothingItems')

router.use('/', userRouter);
router.use('/', itemRouter);

router.use((req, res) => {
    res.status(500).send({ message: 'Can not process request at this time' });
})


module.exports = router;