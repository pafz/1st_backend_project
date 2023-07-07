const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const { authentication, isAdmin } = require('../middleware/authentication');

router.post('/', authentication, isAdmin, ProductController.create);
router.put('/:id', authentication, isAdmin, ProductController.update);
router.delete('/:id', authentication, isAdmin, ProductController.delete);
//router.get('/getAll', authentication, ProductController.getAll);
router.get(
  '/getOneByName/:name',
  authentication,
  ProductController.getOneByName
);
router.get('/getById/:id', authentication, ProductController.getById);
router.get(
  '/getOneByPrice/:price',
  authentication,
  ProductController.getOneByPrice
);
router.get('/getDescByPrice', authentication, ProductController.getDescByPrice);
router.get(
  '/getAllProductsAndCategories',
  ProductController.getAllProductsAndCategories
);

module.exports = router;
