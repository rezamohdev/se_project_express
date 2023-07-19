const router = require('express').Router();

const { likeItem, dislikeItem } = require('../controllers/likes');


// PUT /items/:itemId/likes — like an item
router.put('/items/:itemId/likes', likeItem);

// DELETE /items/:itemId/likes — unlike an item
router.delete('/items/:itemId/likes', dislikeItem);

module.exports = router;