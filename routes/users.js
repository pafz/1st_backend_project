const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController'); //se autocompleta al escribir la línea 5

router.post('/', UserController.create);
router.get('/', UserController.getAll);
router.post('/login', UserController.login);

module.exports = router;
