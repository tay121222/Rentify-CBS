const ItemReview = require('../models/ItemReview');
const Reservation = require('../models/Reservation');

class ItemReviewController {
  static async createItemReview(req, res) {
    try {
      const { itemId, rating, comment } = req.body;
      const { userId } = req;

      const reservation = await Reservation.findOne({ item: itemId, user: userId });
      if (!reservation) {
        return res.status(403).json({ message: 'You can only review items you have booked.' });
      }

      const itemReview = new ItemReview({
        item: itemId,
        user: userId,
        rating,
        comment,
      });

      await itemReview.save();

      return res.status(201).json({ message: 'Item review created successfully', itemReview });
    } catch (error) {
      console.error('Error creating item review:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async updateItemReview(req, res) {
    try {
      const { reviewId } = req.params;
      const { rating, comment } = req.body;
      const { userId } = req;

      const itemReview = await ItemReview.findById(reviewId);
      if (!itemReview) {
        return res.status(404).json({ message: 'Item review not found' });
      }

      if (itemReview.user.toString() !== userId.toString()) {
        return res.status(403).json({ message: 'You are not authorized to update this review' });
      }

      itemReview.rating = rating;
      itemReview.comment = comment;
      await itemReview.save();

      return res.status(200).json({ message: 'Item review updated successfully', itemReview });
    } catch (error) {
      console.error('Error updating item review:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async deleteItemReview(req, res) {
    try {
      const { reviewId } = req.params;
      const { userId } = req;

      const itemReview = await ItemReview.findById(reviewId);
      if (!itemReview) {
        return res.status(404).json({ message: 'Item review not found' });
      }

      if (itemReview.user.toString() !== userId.toString()) {
        return res.status(403).json({ message: 'You are not authorized to delete this review' });
      }

      await itemReview.remove();

      return res.status(200).json({ message: 'Item review deleted successfully' });
    } catch (error) {
      console.error('Error deleting item review:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async getItemReviewsByItemId(req, res) {
    try {
      const { itemId } = req.params;
      const itemReviews = await ItemReview.find({ item: itemId }).populate('user', 'username');

      res.status(200).json({ itemReviews });
    } catch (error) {
      console.error('Error fetching item reviews by item ID:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async getItemReviewsByUserId(req, res) {
    try {
      const userId = req.userId;
      const itemReviews = await ItemReview.find({ user: userId });

      res.status(200).json({ itemReviews });
    } catch (error) {
      console.error('Error fetching item reviews by user ID:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async getItemReviewsByUserIdd(req, res) {
    try {
        const userId = req.params.userId;
        const itemReviews = await ItemReview.find({ user: userId });

        res.status(200).json({ itemReviews });
    } catch (error) {
        console.error('Error fetching item reviews by user ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
}

module.exports = ItemReviewController;
