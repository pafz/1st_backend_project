const { Review, User } = require('../models/index');

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

  async getReviewsAndUser(req, res) {
    try {
      const reviewsAndOrders = await Review.findAll({
        include: [
          {
            model: User,
            attributes: ['name'],
          },
        ],
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
