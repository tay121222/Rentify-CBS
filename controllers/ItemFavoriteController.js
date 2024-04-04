const ItemFavorite = require('../models/ItemFavorite');

class ItemFavoriteController {
  static async favoriteItem(req, res) {
    try {
      const { userId } = req;
      const { itemId } = req.params;

      const favorite = await ItemFavorite.findOne({ user: userId, item: itemId });
      if (favorite) {
        return res.status(400).json({ message: 'Item already favorited' });
      }

      await ItemFavorite.create({ user: userId, item: itemId });

      return res.status(201).json({ message: 'Item favorited successfully' });
    } catch (error) {
      console.error('Error favoriting item:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async unfavoriteItem(req, res) {
    try {
      const { userId } = req;
      const { itemId } = req.params;

      await ItemFavorite.findOneAndDelete({ user: userId, item: itemId });

      return res.status(200).json({ message: 'Item unfavorited successfully' });
    } catch (error) {
      console.error('Error unfavoriting item:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async getUserFavorites(req, res) {
    try {
      const { userId } = req;

      const favorites = await ItemFavorite.find({ user: userId }).populate('item');

      return res.status(200).json({ favorites });
    } catch (error) {
      console.error('Error fetching user favorites:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}

module.exports = ItemFavoriteController;
