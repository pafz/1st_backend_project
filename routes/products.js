const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const { authentication, isAdmin } = require('../middleware/authentication');

router.post('/', authentication, ProductController.create);
router.put('/:id', authentication, ProductController.update);
router.delete('/:id', authentication, isAdmin, ProductController.delete);
router.get('/getAll', authentication, ProductController.getAll);
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

module.exports = router;
