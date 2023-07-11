const express = require('express');
const router = express.Router();
const ReviewController = require('../controllers/ReviewController');

router.post('/createReview', ReviewController.create);
router.get('/getReviewsAndUser', ReviewController.getReviewsAndUser);
router.put('/updateReviewById/:id', ReviewController.updateReviewById);
router.delete('/deleteReviewById/:id', ReviewController.deleteReviewById);

module.exports = router;
