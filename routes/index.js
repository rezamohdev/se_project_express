const router = require('express').Router();
const userRouter = require('./users');
const itemRouter = require('./clothingItems')
const likesRouter = require('./clothingItems');
const NotFoundError = require('../errors/not-found-err');

router.use('/', userRouter);
router.use('/', itemRouter);
router.use('/', likesRouter);
router.use(() => {
    throw new NotFoundError(`The page you're looking for not found`);
});



module.exports = router;