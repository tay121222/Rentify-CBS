const express = require('express');
const verifyToken = require('../utils/auth');

const router = express.Router();
const ReservationController = require('../controllers/ReservationController');

router.post('/create', verifyToken, ReservationController.createReservation);
router.put('/update/:reservationId', verifyToken, ReservationController.updateReservation);
router.put('/cancel/:reservationId', verifyToken, ReservationController.cancelReservation);
router.get('/user', verifyToken, ReservationController.getUserReservations);

module.exports = router;
