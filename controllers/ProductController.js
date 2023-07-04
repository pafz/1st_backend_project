const { Product, User, Sequelize } = require('../models/index');
const { Op } = Sequelize;
//User comming soon

const ProductController = {
  //async by chat
  async create(req, res) {
    try {
      const product = await Product.create(req.body);
      res
        .status(201)
        .send({ message: 'Product insert successfully!', product });
    } catch (err) {
      console.error(err);
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
    } catch (err) {
      console.log(err);
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
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  },

  // TODO: works?! endpoint to show products & categories async!
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
    } catch (err) {
      console.error(err);
    }
  },

  // getById(req, res) {
  //   Product.findByIdPk(req.param.id).then(product => res.send(product));
  // },
  //TODO: chat
  async getOneByName(req, res) {
    try {
      const product = await Product.findOne({
        where: {
          name: {
            [Op.like]: `%${req.params.name}%`,
          },
        },
      });
      res.send(product);
    } catch (err) {
      console.error(err);
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

  //chat OK
  async getOneByPrice(req, res) {
    try {
      const products = await Product.findOne({
        where: {
          price: {
            [Op.like]: `%${req.params.price}%`,
          },
        },
      });
      res.send(products);
    } catch (err) {
      console.error(err);
    }
  },

  //TODO: check if it is ok NECESSARY TO TAKE DE param
  async getDescByPrice(req, res) {
    try {
      const products = await Product.findAll({
        order: [['price', 'DESC']],
      });
      res.send(products);
    } catch (err) {
      console.error(err);
    }
  },

  //TODO: more exercises
};

module.exports = ProductController;
