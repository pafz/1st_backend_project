const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/CategoryController');
const { authentication, isAdmin } = require('../middleware/authentication');

router.post('/create', authentication, CategoryController.create);
router.put('/update/id/:id', authentication, CategoryController.update);
router.get(
  '/getAllProductsAndCategories',
  authentication,
  CategoryController.getAllProductsAndCategories
);
router.delete(
  '/delete/id/:id',
  authentication,
  isAdmin,
  CategoryController.delete
);
router.get('/', authentication, CategoryController.getAllProductsAndCategories);
router.get(
  '/getCategoryById/:id',
  authentication,
  CategoryController.getCategoryById
);
router.get(
  '/getOneCategoryByName/:name',
  authentication,
  CategoryController.getOneCategoryByName
);

module.exports = router;
