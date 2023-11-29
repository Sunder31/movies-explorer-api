const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');

const updateUserInfo = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('Пользователь с таким Email уже существует'));
      } else {
        next(err);
      }
    });
};

const getUserInfo = (req, res, next) => {
  const userId = req.user._id;

  User.findById(userId)
    .orFail(new NotFoundError('Пользователь не найден'))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(next);
};

module.exports = {
  updateUserInfo,
  getUserInfo,
};
