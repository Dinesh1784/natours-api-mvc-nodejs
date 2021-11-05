const express = require('express');
const tourController = require('../controller/tourController');
const authController = require('../controller/authController');
// const reviewController = require('../controller/reviewController');
const reviewRouter = require('./reviewRoutes');
const router = express.Router();

// router.param('id', tourController.checkID);

//advance express feature it send data to review router using mergeParam
router.use('/:tourId/review', reviewRouter);

router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTour, tourController.getAllTour);

router
  .route('/monthly-plan/:year')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'lead-guid', 'guid'),
    tourController.getMonthlyPlan
  );

router
  .route('/tours-within/:distance/center/:latlng/unit/:unit')
  .get(tourController.getToursWithin);

router.route('/distance/:latlng/unit/:unit').get(tourController.getDistnces);

router
  .route('/')
  .get(tourController.getAllTour)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'lead-guid'),
    tourController.createTour
  );

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'lead-guid'),
    tourController.uploadTourImages,
    tourController.resizeTourImages,
    tourController.updateTour
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guid'),
    tourController.deleteTour
  );

// router
//   .route('/:tourId/review')
//   .post(
//     authController.protect,
//     authController.restrictTo('user'),
//     reviewController.createReview
//   );

module.exports = router;
