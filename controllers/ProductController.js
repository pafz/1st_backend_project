const { Product, User, Sequelize } = require('../models/index');
const { Op } = Sequelize;
//TODO: Why Op?????

const ProductController = {
  //async by chat
  async create(req, res) {
    try {
      const product = await Product.create(req.body);
      res
        .status(201)
        .send({ message: 'Product insert successfully!', product });
    } catch (error) {
      console.error(error);
    }
  },

  //endpoint to update async con try catch
  async update(req, res) {
    try {
      await Product.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      res.send('Product successfully updated');
    } catch (error) {
      console.log(error);
    }
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

  //chat:
  async getById(req, res) {
    try {
      const product = await Product.findByPk(req.params.id);
      res.send(product);
    } catch (error) {
      console.error(error);
    }
  },

  // getById(req, res) {
  //   Product.findByIdPk(req.param.id).then(product => res.send(product));
  // },
  //chat
  async getOneByName(req, res) {
    try {
      const product = await Product.findOne({
        where: {
          name: {
            [Op.like]: `% ${req.params.name} %`,
          },
        },
        //include: [User],
      });
      res.send(product);
    } catch (error) {
      console.error(error);
    }
  },

  //TODO: first introduce a name an after, to search it
  // getOneByName(req, res) {
  //   Product.findOne({
  //     where: {
  //       name: {
  //         [Op.like]: `% ${req.params.name} %`,
  //       },
  //     },
  //     //include: [User],
  //   }).then(product => res.send(product));
  // },

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
