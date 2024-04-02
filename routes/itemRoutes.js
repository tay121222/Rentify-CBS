const express = require('express');

const router = express.Router();
const ItemController = require('../controllers/ItemController.js');
const verifyToken = require('../utils/auth')

router.post('/add', verifyToken, ItemController.addItem);
router.put('/update/:itemId', verifyToken, ItemController.updateItem);
router.delete('/delete/:itemId', verifyToken, ItemController.deleteItem);
router.get('/', ItemController.getAllItems);
router.get('/owner/:ownerId', ItemController.getItemsByOwner);
router.get('/:itemId', ItemController.getItemById);
router.get('/search/keyword', ItemController.searchItems);
router.put('/:itemId/availability', verifyToken, ItemController.updateItemAvailability);
router.get('/category/:categoryName', ItemController.getItemsByCategory);

module.exports = router;
