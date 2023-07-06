const { Delivery } = require('../models/index');

const DeliveryController = {
  async createDelivery(req, res) {
    try {
      const delivery = await Delivery.create(req.body);
      res.status(201).send({ msg: 'Delivery created successfully!', delivery });
    } catch (error) {
      console.error(error);
    }
  },
};

module.exports = DeliveryController;
