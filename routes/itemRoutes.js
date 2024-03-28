const express = require('express');

const router = express.Router();
const ItemController = require('../controllers/ItemController');

router.post('/add', ItemController.addItem);
router.put('/update/:itemId', ItemController.updateItem)
router.delete('/delete/:itemId', ItemController.deleteItem)
router.get('/', ItemController.getAllItems);
router.get('/owner/:ownerId', ItemController.getItemsByOwner);
router.get('/:itemId', ItemController.getItemById);
router.get('/search/keyword', ItemController.searchItems);
//router.put('/:itemId/availability', ItemController.updateItemAvailability);
router.get('/category/:categoryName', ItemController.getItemsByCategory);

module.exports = router;
