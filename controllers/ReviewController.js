const { Review, Product, Order, User, Category } = require('../models/index');

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
      const reviewsAndOrders = await Review.findAll({
        include: [
          {
            model: User,
            attributes: ['name'],
          },
        ],
        // include: [
        //   { model: User, attributes: ['name'], through: { attributes: [] } }, through se pone cuando la relación en M : N. NO OLVIDAR model: _ _ _
        // ],
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

  //FIXME: not necessary
  //traer todos productos y que ahora muestre los Productos junto a sus Categorías y sus Reviews
  async getProductsCategoriesReviews(req, res) {
    try {
      const productsCategoriesReviews = await Review.findAll({
        include: {
          model: Product,
          include: Category,
        },
        //include: [{ Order, attributes: ['name'], through: { attributes: [] } }], no funciona porque User no tiene Id con Products, por lo que hay que utilizar model
        //a través del modelo product se incluye la Category, tbl que no está relacionada
      });
      res.send({
        message:
          'Users, orders and products and categories are shown successfully!',
        productsCategoriesReviews,
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
