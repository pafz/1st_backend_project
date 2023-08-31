const { Order, Product, Delivery, OrderProduct } = require('../models/index');

const OrderController = {
  //Crea un endpoint para ver los pedidos junto a los productos que tienen
  async getOrdersAndProducts(req, res) {
    console.log(req.user);
    try {
      const ordersProducts = await Order.findAll({
        include: { model: OrderProduct, include: Product },
        where: { UserId: req.user.id },
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
      const products = req.body.productId;
      let payment = 0;

      for (productId of products) {
        const product = await Product.findByPk(productId);
        payment += product.price;
      }

      const delivery = await Delivery.findByPk(req.body.delivery);
      payment += delivery.price;

      const order = await Order.create({
        ...req.body,
        payment,
        UserId: req.user.id,
      });

      for (ProductId of req.body.productId) {
        await OrderProduct.create({ ProductId, OrderId: order.id });
      }

      res.status(201).send({ message: 'Order created successfully!', order });
    } catch (err) {
      console.error(err);
    }
  },
};

module.exports = OrderController;
