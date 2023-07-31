const router = require('express').Router();
const {
    getClothingItem,
    createClothingItem,
    deleteClothingItem } = require('../controllers/clothingItems');
const { likeItem, dislikeItem } = require('../controllers/likes');
const auth = require('../middlewares/auth');



// GET / items — returns all clothing items
router.get('/items', getClothingItem);

// POST / items — creates a new item
router.post('/items', auth, createClothingItem);

// DELETE / items /: itemId — deletes an item by _id
router.delete('/items/:itemId', auth, deleteClothingItem);

// PUT /items/:itemId/likes — like an item
router.put('/items/:itemId/likes', auth, likeItem);

// DELETE /items/:itemId/likes — unlike an item
router.delete('/items/:itemId/likes', auth, dislikeItem);

module.exports = router;
