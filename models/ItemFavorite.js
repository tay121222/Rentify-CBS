const mongoose = require('mongoose');

const itemFavoriteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
}, { timestamps: true });

const ItemFavorite = mongoose.model('ItemFavorite', itemFavoriteSchema);

module.exports = ItemFavorite;
