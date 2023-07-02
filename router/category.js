const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/CategoryController');

router.post('/', CategoryController.create);
router.put('/id/:id', CategoryController.update);
router.delete('/id/:id', CategoryController.delete);
router.get('/', CategoryController.getAllProductsAndCategories);
router.get('/', CategoryController.getProductById);
router.get('/', CategoryController.getOneProductByName);

module.exports = router;
