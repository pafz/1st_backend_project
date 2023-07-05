const { Order, Category } = require('../models/index');

const OrderController = {
  //Crea un endpoint para ver los pedidos junto a los productos que tienen
  async getOrdersAndProducts(req, res) {
    try {
      const ordersProducts = await Order.findAll({
        include: [
          {
            model: Category,
            attributes: ['name'],
            through: { attributes: [] },
          },
        ],
      });
      res.send({
        message: 'Orders and products shown successfully!',
        ordersProducts,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send('There was a problem loading orders and products');
    }
  },
  //

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
