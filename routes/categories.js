const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/CategoryController');
const { authentication, isAdmin } = require('../middleware/authentication');

router.post('/create', authentication, CategoryController.create);
router.get('/getCategoryById/:id', CategoryController.getCategoryById);
router.get(
  '/getOneCategoryByName/:name',
  CategoryController.getOneCategoryByName
);
router.get(
  '/getAllCategoriesAndProducts',
  CategoryController.getAllCategoriesAndProducts
);
router.put('/update/:id', authentication, CategoryController.update);
router.delete(
  '/deleteCategory/:id',
  authentication,
  isAdmin,
  CategoryController.deleteCategory
);

module.exports = router;
