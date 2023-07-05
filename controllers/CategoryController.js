const { Category, Product, Sequelize } = require('../models/index');
//const category = require('../models/category'); unnecessary?!
const { Op } = Sequelize;

const CategoryController = {
  //endpoint to create
  async create(req, res) {
    try {
      const category = await Category.create(req.body);
      res
        .status(201)
        .send({ message: 'Category created successfully!', category });
    } catch (err) {
      console.error(err);
    }
  },

  async update(req, res) {
    await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.send('Category successfully updated');
  },

  async delete(req, res) {
    try {
      await Category.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.send('The publication has been successfully removed');
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  //TODO: check!? endpoint to see all categories & products
  async getAllProductsAndCategories(req, res) {
    try {
      const productsAndCategoriesAll = await Category.findAll({
        include: [Product],
      });
      res.send(productsAndCategoriesAll);
    } catch (error) {
      console.error(err);
      res.status(500).send(err);
    }
  },

  async getCategoryById(req, res) {
    try {
      const category = await Category.findByPk(req.params.id);
      res.send(category);
    } catch (err) {
      console.error(err);
    }
  },

  async getOneCategoryByName(req, res) {
    try {
      const category = await Category.findOne({
        where: {
          name: {
            [Op.like]: `%${req.params.name}%`,
          },
        },
      });
      res.send(category);
    } catch (err) {
      console.error(err);
    }
  },
};

module.exports = CategoryController;
