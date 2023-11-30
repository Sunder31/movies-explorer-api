const { rateLimit } = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  message: 'Превышено количество запросов, повторите попытку позднее.',
});

module.exports = { limiter };
