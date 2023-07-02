const { Product, User } = require('../models/index');
const product = require('../models/product');

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
  getById(req, res) {
    Product.findByIdPk(req.param.id, {
      include: [User],
    }).then(product => res.send(product));
  },
  getOneByName(req, res) {
    Product.findAll({
      where: {
        name: {
          [Op.like]: `% ${req.params.id} %`,
        },
      },
      include: [User],
    }).then(product => res.send(product));
  },
  getOneByPrice(req, res) {
    Product.findAll({
      where: {
        name: {
          [Op.like]: `% ${req.params.price}%`,
        },
      },
      include: [User],
    }).then(product => res.send(product));
  },
  //TODO: check if it is ok
  getDescByPrice(req, res) {
    Product.findAll({
      where: {
        order: [['price', 'DESC']],
      },
    });
  }, //TODO: more exercises
};

module.exports = ProductController;
