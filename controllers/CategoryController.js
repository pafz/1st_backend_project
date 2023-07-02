const { Category, Product } = require('../models/index');
//const category = require('../models/category'); unnecessary?!

const CategoryController = {
  //endpoint to create
  create(req, res) {
    Category.create(req.body)
      .then(category =>
        res
          .status(201)
          .send({ message: 'Category created successfully!', category })
      )
      .catch(console.error);
  },

  //endpoint to update
  async update(req, res) {
    await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.send('Category successfully updated');
  },

  // endpoint to delete
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
  getAllProductsAndCategories(req, res) {
    Category.findAll({
      include: [Product],
    })
      .then(categories => res.send(categories))
      .catch(err => {
        console.error(err);
        res.status(500).send(err);
      });
  },

  // endpoint to return a category by id
  getCategoryById(req, res) {
    Category.findByPk(req.params.id, {
      include: [User], //TODO: it is ok?!
    }).then(category => res.send(category));
  },

  // filter to search category by name
  getOneCategoryByName(req, res) {
    Post.findOne({
      where: {
        name: {
          [Op.like]: `%${req.params.title}%`,
        },
      },
      include: [User],
    }).then(post => res.send(post));
  },
};

module.exports = CategoryController;
