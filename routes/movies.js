const router = require('express').Router();
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');
const {
  createMovieValidation,
  deleteMovieValidation,
} = require('../routeValidation/movies');

router.get('/', getMovies);

router.post('/', createMovieValidation, createMovie);

router.delete('/:movieId', deleteMovieValidation, deleteMovie);

module.exports = router;
