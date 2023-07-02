const { Post, User } = require('../models/index');

const ProductController = {
  create(res, res) {
    Product.create(req.body).then(post =>
      res.status(201).send({ message: 'Product insert successfully!', product })
    );
  },
  getAll(req, res) {
    Product.findAll({ include: [User] })
      .then(products => res.send(products))
      .catch(err => {
        console.log(err);
        res
          .status(500)
          .send({ message: 'There is a problem to load products' });
      });
  },
};

module.exports = ProductController;
