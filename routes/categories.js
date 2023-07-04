const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/CategoryController');

router.post('/create', CategoryController.create);
router.put('/update/id/:id', CategoryController.update);
router.delete('/delete/id/:id', CategoryController.delete);
router.get('/', CategoryController.getAllProductsAndCategories);
router.get('/getCategoryById/:id', CategoryController.getCategoryById);
router.get(
  '/getOneCategoryByName/:name',
  CategoryController.getOneCategoryByName
);

module.exports = router;
