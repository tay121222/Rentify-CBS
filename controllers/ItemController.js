const jwt = require('jsonwebtoken');
const Item = require('../models/Item');

class ItemController {
  static async addItem(req, res) {
    try {
      const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
      if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
      }

      const decodedToken = jwt.verify(token, process.env.JWT_SECRET || 'techdinos');
      if (!decodedToken.userId) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
      }

      const {
        name, description, price, category, image,
      } = req.body;
      const owner = decodedToken.userId;

      const newItem = new Item({
        name,
        description,
        owner,
        price,
        category,
        image,
      });

      await newItem.save();

      return res.status(201).json({ message: 'Item added successfully', item: newItem });
    } catch (error) {
      console.error('Error adding item:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}

module.exports = ItemController;
