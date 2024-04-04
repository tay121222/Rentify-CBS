const express = require('express');

const router = express.Router();
const verifyToken = require('../utils/auth');
const ItemFavoriteController = require('../controllers/ItemFavoriteController');

router.post('/add/:itemId', verifyToken, ItemFavoriteController.favoriteItem);
router.delete('/delete/:itemId', verifyToken, ItemFavoriteController.unfavoriteItem);
router.get('/', verifyToken, ItemFavoriteController.getUserFavorites);

module.exports = router;
