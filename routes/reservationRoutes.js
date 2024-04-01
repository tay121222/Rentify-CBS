const express = require('express');

const router = express.Router();
const ReservationController = require('../controllers/ReservationController');

router.post('/create', ReservationController.createReservation);

module.exports = router;
