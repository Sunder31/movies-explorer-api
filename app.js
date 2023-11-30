require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
// const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes');
const { PORT, MONGO_DB } = require('./config');
const { limiter } = require('./middlewares/rateLimiter');

mongoose.connect(MONGO_DB);

const app = express();

// app.use(cors({
//   credentials: true,
//   origin: '',
// }));

app.use(helmet());

app.use(express.json());

app.use(cookieParser());

app.use(requestLogger);

app.use(limiter);

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
