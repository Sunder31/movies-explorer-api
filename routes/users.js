const router = require('express').Router();
const {
  updateUserInfo,
  getUserInfo,
} = require('../controllers/users');
const {
  updateUserInfoValidation,
} = require('../routeValidation/users');

router.get('/me', getUserInfo);

router.patch('/me', updateUserInfoValidation, updateUserInfo);

module.exports = router;
