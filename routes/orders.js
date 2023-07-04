const express = require('express');
const router = express.Router();

const OrderController = require('../controllers/UserController');

router.post('/createOrder', OrderController.create);

module.exports = router;
