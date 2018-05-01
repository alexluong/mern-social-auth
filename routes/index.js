const authRouter      = require('./auth');
const protectedRouter = require('./protected');
const userRouter      = require('./user');

const router = require('express').Router();

router.get('/ping', (request, response) => {
  response.status(200).send({ });
});
router.use('/protected', protectedRouter);
router.use('/auth', authRouter);
router.use('/user', userRouter);

module.exports = router;