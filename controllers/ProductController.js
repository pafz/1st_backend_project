const { Product, User, Category, Sequelize } = require('../models/index');
const { Op } = Sequelize;
//User comming soon
//Category ok? en require

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

  async getAllProductsAndCategories(req, res) {
    try {
      const productsAndCategoriesAll = await Product.findAll({
        include: [Category],
      });
      res.send(productsAndCategoriesAll);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
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
  //El endpoint de traer productos debe mostrarse junto a la categoría o categorías que pertenece
  //TODO: error mín 1:14' DUDA para 6 de julio
  async getProductsAndCategories(req, res) {
    try {
      const productsCategories = await Product.findAll({
        include: [
          {
            model: Category,
            attributes: ['name'],
            through: { attributes: [] },
          },
        ],
      });
      res.send({
        message: 'Products and categories shown successfully!',
        productsCategories,
      });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .send('There was a problem loading products and categories');
    }
  },

  //TODO: more exercises.
};

module.exports = ProductController;
