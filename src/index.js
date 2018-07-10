const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');
const cors = require('cors');

// DB Setup
require('./config/db');

// App Setup
const routes = require('./routes');
const config = require('./config');

const app = express();
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: '*/*', limit: '200mb' }));
app.use(passport.initialize());
app.use('/', routes); // routing

// Server Setup
const port = config.PORT;
app.listen(port, () => {
  console.log('Server listening on port: ' + port);
});
