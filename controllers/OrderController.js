const { Order } = require('../models/index');

const OrderController = {
  //TODO: order INNER JOIN?
  getAll(req, res) {
    Order.findAll({
      include: [User],
    })
      .then(posts => res.send(posts))
      .catch(err => {
        console.error(err);
        res.status(500).send(err);
      });
  },

  async createOrder(req, res) {
    try {
      const order = await Order.create(req.body);
      res.status(201).send({ message: 'Order created successfully!', order });
    } catch (err) {
      console.error(err);
    }
  },
};

module.exports = OrderController;
