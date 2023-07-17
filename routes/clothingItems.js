const router = require('express').Router();
const {
    getClothingItem,
    createClothingItem,
    deleteClothingItem } = require('../controllers/clothingItems');


// GET / items — returns all clothing items
router.get('/items', getClothingItem);

// POST / items — creates a new item
router.post('/items', createClothingItem);

// DELETE / items /: itemId — deletes an item by _id
router.delete('/items/:itemId', deleteClothingItem);

module.exports = router;
