const express = require('express');

const router = express.Router();
const UserController = require('../controllers/UserController');
const verifyToken = require('../utils/auth');

router.post('/register', UserController.register);
router.get('/me', verifyToken, UserController.getUserFromToken);
router.post('/logout', UserController.logout);
router.put('/changePassword', verifyToken, UserController.changePassword);
router.put('/updateProfile', verifyToken, UserController.updateUserProfile);
router.delete('/deleteAccount', verifyToken, UserController.deleteAccount);
router.post('/password/reset', UserController.initiatePasswordReset);
// router.get('/reset/:token', UserController.renderPasswordResetForm);
router.post('/pwd/reset/:token', UserController.resetPassword);
router.get('/verify/:token', UserController.verifyEmail);

module.exports = router;
