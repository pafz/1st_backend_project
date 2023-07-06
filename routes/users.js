const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController'); //autocompletes when typing line 5
const { authentication, isAdmin } = require('../middleware/authentication'); //not using isAdmin

router.post('/', UserController.create);
router.get('/', authentication, UserController.getAll);
router.get(
  '/getUserOrdersProducts',
  authentication,
  UserController.getUserOrdersProducts
);
router.post('/login', UserController.login);
router.delete('/logout', authentication, UserController.logout);

module.exports = router;
