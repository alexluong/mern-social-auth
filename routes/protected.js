const express = require('express');
const requireAuthentication = require('../middlewares/requireAuthentication');

const router = express.Router();

/* GET /protected */
router.get('/', requireAuthentication, (request, response) => {
  response.status(200).send({ hi: 'there ' });
});

module.exports = router;
