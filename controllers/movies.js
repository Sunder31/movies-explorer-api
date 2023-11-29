const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

const getMovies = (req, res, next) => {
  const ownderId = req.user._id;

  Movie.find({ owner: ownderId })
    .then((movies) => {
      res.status(200).send(movies);
    })
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner: req.user._id,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => {
      res.status(201).send(movie);
    })
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  const movieId = req.params._id;

  Movie.findById(movieId)
    .orFail(new NotFoundError('Фильм не найден'))
    .then((movie) => {
      if (movie.owner.valueOf() !== req.user._id) {
        throw new ForbiddenError('Недостаточно прав');
      } else {
        return movie.deleteOne();
      }
    })
    .then(() => {
      res.status(200).send({ message: 'Фильм удален' });
    })
    .catch(next);
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
