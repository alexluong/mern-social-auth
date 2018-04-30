const localRouter  = require('./local');
const googleRouter = require('./google');

const router = require('express').Router();

router.use('/local', localRouter);
router.use('/google', googleRouter);

module.exports = router;