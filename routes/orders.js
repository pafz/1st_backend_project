const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/OrderController');
const { authentication, isAdmin } = require('../middleware/authentication');

router.post('/createOrder', authentication, OrderController.createOrder);
router.get('/getOrdersAndProducts', OrderController.getOrdersAndProducts);

module.exports = router;
