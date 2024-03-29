const express = require('express');

const router = express.Router();
const UserController = require('../controllers/UserController');

router.post('/register', UserController.register);
router.get('/me', UserController.getUserFromToken);
router.post('/logout', UserController.logout);
router.put('/changePassword', UserController.changePassword);
router.put('/updateProfile', UserController.updateUserProfile);
router.delete('/deleteAccount', UserController.deleteAccount);

module.exports = router;
