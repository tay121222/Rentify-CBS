require('dotenv').config();
const mongoose = require('mongoose');

mongoose.set('debug', true);

const connectDB = async () => {
  try {
    const host = process.env.DB_HOST || '192.168.0.134';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'rentify';
    const uri = process.env.MONGODB_URI || `mongodb://${host}:${port}/${database}`;

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
