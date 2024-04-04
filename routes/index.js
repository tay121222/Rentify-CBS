const express = require('express');

const router = express.Router();

const homeRoutes = require('./homeRoutes');
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const itemRoutes = require('./itemRoutes');
const reservationRoutes = require('./reservationRoutes');
const itemReviewRoutes = require('./itemReviewRoutes');
const itemFavoriteRoutes = require('./itemFavoriteRoutes');

router.use('/', homeRoutes);
router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/item', itemRoutes);
router.use('/profile', userRoutes);
router.use('/reservation', reservationRoutes);
router.use('/review', itemReviewRoutes);
router.use('/favourite', itemFavoriteRoutes);

module.exports = router;
