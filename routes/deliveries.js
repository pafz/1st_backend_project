const express = require('express');
const router = express.Router();
const DeliveryController = require('../controllers/DeliveryController');

router.post('/createDelivery', DeliveryController.createDelivery);

module.exports = router;
