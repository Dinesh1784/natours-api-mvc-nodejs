const express = require('express');
const reviewController = require('../controller/reviewController');
const authController = require('../controller/authController');
const router = express.Router({ mergeParams: true });

// tour/:tourId/review POST
// tour/:tourId/review GET

router.use(authController.protect);

router
  .route('/')
  .get(reviewController.getAllReview)
  .post(
    authController.restrictTo('user'),
    reviewController.getTourUserIds,
    reviewController.createReview
  );
router
  .route('/:id')
  .get(reviewController.getReview)
  .patch(
    authController.restrictTo('user', 'admin'),
    reviewController.updateReview
  )
  .delete(
    authController.restrictTo('user', 'admin'),
    reviewController.deleteReview
  );
module.exports = router;
