const express    = require('express');
const bodyParser = require('body-parser');
const morgan     = require('morgan');
const mongoose   = require('mongoose');
const dotenv     = require('dotenv');

const router     = require('./router');

dotenv.config();

// DB Setup
mongoose.connect(process.env.MONGOLAB_URI)
.then(res => {
  console.log('Database connected')
})
.catch(error => {
  console.log('MongoDB connection error: ' + error);
});

// App Setup
const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
router(app);

// Server Setup
const port = process.env.port || 8000;
app.listen(port, () => {
  console.log('Server listening on port: ' + port);
});