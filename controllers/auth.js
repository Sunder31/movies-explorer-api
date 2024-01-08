const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ConflictError = require('../errors/ConflictError');
const { JWT_SECRET, NODE_ENV } = require('../config');

const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => {
      res.status(201).send({
        name, email, _id: user._id,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('Пользователь с таким Email уже существует'));
      } else {
        next(err);
      }
    });
};

const signin = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production'
          ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );

      res
        .cookie('jwt', token, {
          sameSite: 'none',
          maxAge: 604800000,
          httpOnly: true,
        })
        .send({
          name: user.name,
          email,
          _id: user._id,
        });
    })
    .catch(next);
};

const signout = (req, res) => {
  res.clearCookie('jwt').send({ message: 'Выход из аккаунта' });
};

module.exports = {
  createUser,
  signin,
  signout,
};
