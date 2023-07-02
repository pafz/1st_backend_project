const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');

router.post('/', ProductController.create);
router.get('/', ProductController.getAll);
router.getById('/', ProductController.getById);
router.get('/:id', ProductController.getById);
router.get('/:price', ProductController.getOneByPrice);

module.exports = router;
