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

  create(req, res) {
    Order.create(req.body).then(order =>
      res
        .status(201)
        .send({ message: 'Order created successfully!' })
        .catch(console.error)
    );
  },
};

module.exports = OrderController;
