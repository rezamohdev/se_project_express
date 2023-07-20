const router = require('express').Router();
const {
    getClothingItem,
    createClothingItem,
    deleteClothingItem } = require('../controllers/clothingItems');
const { likeItem, dislikeItem } = require('../controllers/likes');



// GET / items — returns all clothing items
router.get('/items', getClothingItem);

// POST / items — creates a new item
router.post('/items', createClothingItem);

// DELETE / items /: itemId — deletes an item by _id
router.delete('/items/:itemId', deleteClothingItem);

// PUT /items/:itemId/likes — like an item
router.put('/items/:itemId/likes', likeItem);

// DELETE /items/:itemId/likes — unlike an item
router.delete('/items/:itemId/likes', dislikeItem);

module.exports = router;
