const router = require('express').Router();
const userRouter = require('./users');
const itemRouter = require('./clothingItems')
const likesRouter = require('./likes')

router.use('/', userRouter);
router.use('/', itemRouter);
router.use('/', likesRouter);
router.use((req, res) => {
    if (req.status === 404) {
        res.status(404).send({
            message: 'Requested resource not found'
        });
    } else {
        // Continue with the rest of the request
        res.send('');
    }
});



module.exports = router;