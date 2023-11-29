const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { JWT_SECRET, NODE_ENV } = require('../config');

// eslint-disable-next-line consistent-return
const auth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return next(new UnauthorizedError('Требуется авторизация'));
  }

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev_secret');
  } catch {
    return next(new UnauthorizedError('Требуется авторизация'));
  }

  req.user = payload;

  next();
};

module.exports = auth;
