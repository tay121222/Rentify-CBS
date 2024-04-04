require('dotenv').config();
const mongoose = require('mongoose');

mongoose.set('debug', true);

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
