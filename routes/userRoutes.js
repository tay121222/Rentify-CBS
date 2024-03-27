const express = require('express');

const router = express.Router();
const UserController = require('../controllers/UserController');

router.post('/register', UserController.register);
router.get('/me', UserController.getUserFromToken);

module.exports = router;
