const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/CategoryController');
//const { authentication, isAdmin } = require('../middleware/authentication');

router.post('/create', CategoryController.create);
router.put('/update/id/:id', CategoryController.update);
router.get(
  '/getAllCategoriesAndProducts',
  CategoryController.getAllCategoriesAndProducts
);

router.get('/getCategoryById/:id', CategoryController.getCategoryById);
router.get(
  '/getOneCategoryByName/:name',
  CategoryController.getOneCategoryByName
);

router.delete('/delete/id/:id', CategoryController.delete);

module.exports = router;
