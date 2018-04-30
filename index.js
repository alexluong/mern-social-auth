const express    = require('express');
const bodyParser = require('body-parser');
const morgan     = require('morgan');
const mongoose   = require('mongoose');
const passport   = require('passport');

const routes = require('./routes');
const config = require('./config');

// DB Setup
mongoose.connect(config.DB_URI)
.then(response => {
  console.log('Database connected');
})
.catch(error => {
  console.log('MongoDB connection error: ' + error);
});

// App Setup
const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
app.use('/', routes); // routing

// Server Setup
const port = config.PORT;
app.listen(port, () => {
  console.log('Server listening on port: ' + port);
});