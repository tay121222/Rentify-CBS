const mongoose = require('mongoose');

const itemReviewSchema = new mongoose.Schema({
  item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true },
  comment: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const ItemReview = mongoose.model('ItemReview', itemReviewSchema);

module.exports = ItemReview;
