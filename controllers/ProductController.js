const {
  Product,
  User,
  Category,
  Review,
  Sequelize,
} = require('../models/index');
const { Op } = Sequelize;
//User comming soon
//Category ok? en require

const ProductController = {
  //async by chat
  async create(req, res, next) {
    try {
      const product = await Product.create(req.body);
      res
        .status(201)
        .send({ message: 'Product insert successfully!', product });
    } catch (err) {
      console.error(err);
      next(err);
    }
  },

  //TODO:
  async getProducts(req, res) {
    try {
      const products = await Product.findAll();
      res.send(products);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
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

  //FIXME: findAll rep, quedarme con uno!!!!
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

  //Actualizar el endpoint de traer producto por id y que ahora muestre los productos junto a sus categorías y sus reviews
  async getById(req, res) {
    try {
      const product = await Product.findByPk(req.params.id, {
        include: [
          {
            model: Review,
          },
          {
            model: Category,
          },
        ],
      });
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
  async getProductsCategoriesAndReviews(req, res) {
    try {
      const productsCategoriesAndReviews = await Product.findAll({
        include: [
          {
            model: Review,
          },
          {
            model: Category,
          },
        ],
      });
      res.send({
        message: 'Products, categories and reviews are shown successfully!',
        productsCategoriesAndReviews,
      });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .send('There was a problem loading products, categories or reviews.');
    }
  },

  //TODO: more exercises.
};

module.exports = ProductController;
