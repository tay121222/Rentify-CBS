const jwt = require('jsonwebtoken');
const Item = require('../models/Item');

class ItemController {
  static async getAllItems(req, res) {
    try {
      const items = await Item.find();
      return res.status(200).json(items);
    } catch (error) {
      console.error('Error fetching items:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async addItem(req, res) {
    try {
      const userId = req.userId;
      const {
        name, description, price, category, image,
      } = req.body;
      const owner = userId;

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

  static async updateItem(req, res) {
    try {
      const userId = req.userId;
      const { itemId } = req.params;
      const item = await Item.findById(itemId);
      if (!item) {
        return res.status(404).json({ message: 'Item not found' });
      }

      if (item.owner.toString() !== userId) {
        return res.status(403).json({ message: 'Forbidden: You do not have permission to update this item' });
      }

      item.name = req.body.name || item.name;
      item.description = req.body.description || item.description;
      item.price = req.body.price || item.price;
      item.category = req.body.category || item.category;
      item.image = req.body.image || item.image;

      if (req.body.availability !== undefined) {
	item.availability = req.body.availability;
      }
      await item.save();

      return res.status(200).json({ message: 'Item updated successfully', item });
    } catch (error) {
      console.error('Error updating item:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async deleteItem(req, res) {
    try {
      const userId = req.userId;
      const { itemId } = req.params;
      const item = await Item.findById(itemId);
      if (!item) {
        return res.status(404).json({ message: 'Item not found' });
      }

      if (item.owner.toString() !== userId) {
        return res.status(403).json({ message: 'Forbidden: You do not have permission to delete this item' });
      }

      await item.remove();

      return res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
      console.error('Error deleting item:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async getItemsByOwner(req, res) {
    try {
      const { ownerId } = req.params;
      const items = await Item.find({ owner: ownerId });

      return res.status(200).json({ items });
    } catch (error) {
      console.error('Error fetching items by owner:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async getItemById(req, res) {
    try {
      const { itemId } = req.params;
      const item = await Item.findById(itemId);
      if (!item) {
        return res.status(404).json({ message: 'Item not found' });
      }

      return res.status(200).json({ item });
    } catch (error) {
      console.error('Error fetching item by ID:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async getItemsByCategory(req, res) {
    try {
      const { categoryName } = req.params;
      const items = await Item.find({ category: categoryName });

      return res.status(200).json({ items });
    } catch (error) {
      console.error('Error fetching items by category:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async searchItems(req, res) {
    try {
      const searchTerm = req.query.q;
      const items = await Item.find({
        $or: [
          { name: { $regex: searchTerm, $options: 'i' } },
          { description: { $regex: searchTerm, $options: 'i' } },
        ],
      });

      return res.status(200).json({ items });
    } catch (error) {
      console.error('Error searching items:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async updateItemAvailability(req, res) {
    try {
      const { itemId } = req.params;
      const { availability } = req.body;

      const item = await Item.findById(itemId);
      if (!item) {
        return res.status(404).json({ message: 'Item not found' });
      }

      item.availability = availability;
      await item.save();

      return res.status(200).json({ message: 'Item availability updated successfully', item });
    } catch (error) {
      console.error('Error updating item availability:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}

module.exports = ItemController;
