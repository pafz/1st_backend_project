const { Order, Product, Delivery } = require('../models/index');

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
      //TODO: Get all products by the id of req.body.productId (is an array) and use it as payment prop
      const products = await Product.findAll({
        where: {
          id: req.body.productId,
        },
      });

      let payment = products.reduce((accumulator, product) => {
        return accumulator + product.price;
      }, 0);

      const delivery = await Delivery.findByPk(req.body.delivery);
      payment += delivery.price;

      const order = await Order.create({
        ...req.body,
        payment,
        UserId: req.user.id,
      });
      order.addProduct(req.body.productId);
      res.status(201).send({ message: 'Order created successfully!', order });
    } catch (err) {
      console.error(err);
    }
  },
};

module.exports = OrderController;
