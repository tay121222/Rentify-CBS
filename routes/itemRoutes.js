const express = require('express');

const router = express.Router();
const ItemController = require('../controllers/ItemController');

router.post('/add', ItemController.addItem);

module.exports = router;
