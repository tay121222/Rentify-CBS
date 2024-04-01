const express = require('express');

const router = express.Router();
const ReservationController = require('../controllers/ReservationController');

router.post('/create', ReservationController.createReservation);
router.put('/update/:reservationId', ReservationController.updateReservation);
router.put('/cancel/:reservationId', ReservationController.cancelReservation);

module.exports = router;
