const { Order, Product } = require('../models/index');

const OrderController = {
  //Crea un endpoint para ver los pedidos junto a los productos que tienen
  async getOrdersAndProducts(req, res) {
    try {
      const ordersProducts = await Order.findAll({
        include: [Product],
      });
      res.send({
        message: 'Orders and products are shown successfully!',
        ordersProducts,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send('There was a problem loading orders or products');
    }
  },

  async createOrder(req, res) {
    try {
      //crear Order y dentro los productos:
      const order = await Order.create({ ...req.body, UserId: req.user.id });
      order.addProduct(req.body.productId);
      res.status(201).send({ message: 'Order created successfully!', order });
    } catch (err) {
      console.error(err);
    }
  },
};

module.exports = OrderController;
