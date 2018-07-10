const localRouter    = require('./local');
const googleRouter   = require('./google');
const facebookRouter = require('./facebook');

const router = require('express').Router();

router.use('/local'   , localRouter);
router.use('/google'  , googleRouter);
router.use('/facebook', facebookRouter);

module.exports = router;