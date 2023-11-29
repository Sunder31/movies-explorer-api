const router = require('express').Router();
const moviesRouter = require('./movies');
const usersRouter = require('./users');
const authRouter = require('./auth');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');

router.use('/', authRouter);

router.use(auth);

router.use('/users', usersRouter);

router.use('/cards', moviesRouter);

router.use('*', (req, res, next) => next(new NotFoundError('Страница не найдена')));

module.exports = router;
