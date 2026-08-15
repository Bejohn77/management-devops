const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
    return true;
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    console.error('DB connection failed — continuing without DB. Fix MONGO_URI or ensure network access.');
    return false;
  }
};

module.exports = connectDB;
