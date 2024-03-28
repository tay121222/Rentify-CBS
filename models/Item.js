const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  price: { type: Number, required: true },
  availability: { type: Boolean, default: true },
  category: { type: String, required: true },
  image: { type: String, required: true }
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
