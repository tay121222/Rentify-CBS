const express = require('express');

const router = express.Router();
const verifyToken = require('../utils/auth');
const ItemReviewController = require('../controllers/ItemReviewController');

router.post('/add', verifyToken, ItemReviewController.createItemReview);
router.put('/update/:reviewId', verifyToken, ItemReviewController.updateItemReview);
router.get('/item/:itemId', ItemReviewController.getItemReviewsByItemId);
router.get('/users', verifyToken, ItemReviewController.getItemReviewsByUserId);
router.get('/user/:userId', verifyToken, ItemReviewController.getItemReviewsByUserIdd);
router.delete('/delete/:reviewId', verifyToken, ItemReviewController.deleteItemReview);

module.exports = router;
