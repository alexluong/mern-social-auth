const mongoose = require('mongoose');

const config = require('./');

require('../models/User');

// DB Setup
mongoose.connect(config.DB_URI)
.then(response => {
  console.log('Database connected');
})
.catch(error => {
  console.log('MongoDB connection error: ' + error);
});