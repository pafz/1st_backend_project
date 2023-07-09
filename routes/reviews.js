const express = require('express');
const router = express.Router();
const ReviewController = require('../controllers/ReviewController');
const { authentication } = require('../middleware/authentication');
//TODO: authentification

router.post('/createReview', ReviewController.create);
//router.get('/getAllReviews', ReviewController.getAllReviews);

router.get('/getReviewsAndUser/:id', ReviewController.getReviewsAndUser);

router.put('/updateReviewById/:id', ReviewController.updateReviewById);
router.delete('/deleteReviewById/:id', ReviewController.deleteReviewById);

module.exports = router;
