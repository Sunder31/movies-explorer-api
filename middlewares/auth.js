const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { JWT_SECRET, NODE_ENV } = require('../config');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    next(new UnauthorizedError('Требуется авторизация'));
    return;
  }

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev_secret');
  } catch {
    next(new UnauthorizedError('Требуется авторизация'));
    return;
  }

  req.user = payload;

  next();
};

module.exports = auth;
