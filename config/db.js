const mongoose = require('mongoose');

const config = require('./');

require('../models/User');

// DB Setup
const connectDB = async () => {
  try {
    const response = mongoose.connect(config.DB_URI);
    console.log('Database connected');
  } catch (error) {
    console.log(`MongoDB connection error: ${error}`);
  }
}

connectDB();