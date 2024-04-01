const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  cancelled: { type: Boolean, default: false },
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
