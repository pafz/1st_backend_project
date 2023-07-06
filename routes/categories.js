const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/CategoryController');
const { authentication, isAdmin } = require('../middleware/authentication');

router.post('/create', authentication, CategoryController.create);
router.put('/update/id/:id', authentication, CategoryController.update);
router.get(
  '/getAllCategoriesAndProducts',
  CategoryController.getAllCategoriesAndProducts
);

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

router.delete(
  '/delete/id/:id',
  authentication,
  isAdmin,
  CategoryController.delete
);

module.exports = router;
