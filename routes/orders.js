const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/UserController');
const { authentication, isAdmin } = require('../middleware/authentication');

router.post('/createOrder', authentication, OrderController.create);
// router.get(
//   '/getOrdersAndProducts',
//   /*authentication,*/ OrderController.getOrdersAndProducts
// );

module.exports = router;
