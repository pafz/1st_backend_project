const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');

router.post('/', ProductController.create);
router.put('/:id', ProductController.update);
router.delete('/:id', ProductController.delete);
router.get('/getAll', ProductController.getAll);
router.get('/getOneByName/:name', ProductController.getOneByName); //ok? or use findOne?
router.get('/getById/:id', ProductController.getById);
router.get('/getOneByPrice/:price', ProductController.getOneByPrice);
router.get('/getDescByPrice', ProductController.getDescByPrice);

module.exports = router;
