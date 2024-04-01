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
}

module.exports = ReservationController;
