const { Product, User } = require('../models/index');
const product = require('../models/product');

const ProductController = {
  create(res, res) {
    Product.create(req.body).then(post =>
      res.status(201).send({ message: 'Product insert successfully!', product })
    );
  },

  //endpoint to update
  async update(req, res) {
    await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.send('Product successfully updated');
  },

  // endpoint to delete
  async delete(req, res) {
    try {
      await Product.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.send('The product has been successfully removed');
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  // TODO: works?! endpoint to show products & categories
  getAll(req, res) {
    Product.findAll({ include: [Categories] })
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
