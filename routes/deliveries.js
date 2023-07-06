const express = require('express');
const router = express.Router();
const DeliveryController = require('../controllers/DeliveryController');
const { authentication, isAdmin } = require('../middleware/authentication');

router.post(
  '/createDelivery',
  authentication,
  DeliveryController.createDelivery
);

module.exports = router;
