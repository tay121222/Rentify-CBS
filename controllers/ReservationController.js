const jwt = require('jsonwebtoken');
const Reservation = require('../models/Reservation');
const Item = require('../models/Item');

const mySecret = process.env.JWT_SECRET || 'techdinos';

class ReservationController {
  static async createReservation(req, res) {
    try {
      const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
      if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
      }

      const decodedToken = jwt.verify(token, process.env.JWT_SECRET || mySecret);
      if (!decodedToken.userId) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
      }
      const { userId } = decodedToken;
      const { itemId, startDate, endDate } = req.body;

      const item = await Item.findById(itemId);
      if (!item || !item.availability) {
        return res.status(400).json({ message: 'Item is not available' });
      }

      const existingReservation = await Reservation.findOne({
        itemId,
        $or: [
          { startDate: { $lte: endDate }, endDate: { $gte: startDate } },
          { startDate: { $gte: startDate, $lte: endDate } },
        ],
      });

      if (existingReservation) {
        return res.status(400).json({ message: 'Item is not available for the specified dates' });
      }

      const reservation = new Reservation({
        itemId,
        userId,
        startDate,
        endDate,
      });

      await reservation.save();

      return res.status(201).json({ message: 'Reservation created successfully', reservation });
    } catch (error) {
      console.error('Error creating reservation:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async updateReservation(req, res) {
    try {
      const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
      if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
      }

      const decodedToken = jwt.verify(token, mySecret);
      if (!decodedToken.userId) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
      }
      const { reservationId } = req.params;
      const { startDate, endDate } = req.body;

      const reservation = await Reservation.findById(reservationId);
      if (!reservation) {
        return res.status(404).json({ message: 'Reservation not found' });
      }

      if (decodedToken.userId !== reservation.userId.toString()) {
        return res.status(403).json({ message: 'Forbidden: You are not authorized to update this reservation' });
      }

      reservation.startDate = startDate;
      reservation.endDate = endDate;
      await reservation.save();

      return res.status(200).json({ message: 'Reservation updated successfully', reservation });
    } catch (error) {
      console.error('Error updating reservation:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async cancelReservation(req, res) {
    try {
      const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
      if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
      }

      const decodedToken = jwt.verify(token, mySecret);
      if (!decodedToken.userId) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
      }

      const { reservationId } = req.params;
      const reservation = await Reservation.findById(reservationId);

      if (!reservation) {
        return res.status(404).json({ message: 'Reservation not found' });
      }

      if (reservation.cancelled) {
        return res.status(400).json({ message: 'Reservation is already cancelled' });
      }

      if (decodedToken.userId !== reservation.userId.toString()) {
        return res.status(403).json({ message: 'Forbidden: You are not authorized to cancel this reservation' });
      }

      reservation.cancelled = true;
      await reservation.save();
      return res.status(200).json({ message: 'Reservation cancelled successfully' });
    } catch (error) {
      console.error('Error cancelling reservation:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}

module.exports = ReservationController;
