const {
  Review,
  Product,
  Order,
  User,
  OrderProduct,
} = require('../models/index');

const ReviewController = {
  async create(req, res) {
    try {
      const review = await Review.create({
        ...req.body,
        title: req.body.title,
        comment: req.body.comment,
        ProductId: req.body.ProductId,
      });
      res
        .status(201)
        .send({ msg: 'Your review has been create successfully!', review });
    } catch (err) {
      console.error(err);
    }
  },

  //El endpoint de traer reviews debe mostrarlas junto al usuario UserId que hizo esa review
  async getReviewsAndUser(req, res) {
    try {
      const reviewsAndOrders = await Review.findByPk(req.params.id, {
        include: {
          model: OrderProduct,
          model: Order,
          include: User,
        },
      });
      res.send({
        message: 'Reviews and user are shown successfully!',
        reviewsAndOrders,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send('There was a problem loading reviews or user');
    }
  },

  //FIXME: example, to detele
  async getUserOrdersProducts(req, res) {
    try {
      //TODO: DIFF req.user. check how it works
      const userOrdersProducts = await User.findByPk(req.user.id, {
        include: {
          model: Order,
          include: Product,
        },
        //include: [{ Order, attributes: ['name'], through: { attributes: [] } }], no funciona porque User no tiene Id con Products, por lo que hay que utilizar model
      });
      res.send({
        message:
          'Users, orders and products and categories are shown successfully!',
        userOrdersProducts,
      });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .send('There was a problem loading user, orders or categories');
    }
  },

  //   CRUD Read
  //   async getAllReviews(req, res) {
  //     try {
  //       const reviews = await Review.findAll();
  //       res.send({ msg: 'There you are all the reviews', reviews });
  //     } catch (err) {
  //       console.error(err);
  //       res.status(500).send({ message: 'There was a problem loading reviews' });
  //     }
  //   },

  async updateReviewById(req, res) {
    try {
      await Review.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      res.send('Review successfully updated');
    } catch (err) {
      console.log(err);
    }
  },

  async deleteReviewById(req, res) {
    try {
      await Review.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.send('The review has been successfully removed');
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  },
};

module.exports = ReviewController;
