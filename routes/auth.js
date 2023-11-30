const router = require('express').Router();
const { createUser, signin, signout } = require('../controllers/auth');
const { signinValidation, signupValidation } = require('../routeValidation/auth');

router.post('/signin', signinValidation, signin);

router.post('/signup', signupValidation, createUser);

router.get('/signout', signout);

module.exports = router;
