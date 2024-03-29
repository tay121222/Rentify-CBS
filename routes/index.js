const express = require('express');

const router = express.Router();

const homeRoutes = require('./homeRoutes');
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const itemRoutes = require('./itemRoutes');

router.use('/', homeRoutes);
router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/item', itemRoutes);
router.use('/profile', userRoutes);

module.exports = router;
