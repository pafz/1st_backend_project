const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const { authentication } = require('../middleware/authentication');

router.post('/', UserController.create);
router.post('/login', UserController.login);
router.get(
  '/getUserOrdersProducts',
  authentication,
  UserController.getUserOrdersProducts
);
router.get('/confirm/:mailToken', UserController.confirm);

router.delete('/logout', authentication, UserController.logout);

module.exports = router;
