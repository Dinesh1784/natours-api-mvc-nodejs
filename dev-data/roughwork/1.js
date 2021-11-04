const Tour = require('../models/tourModel');

// exports.checkID = (req, res, next, val) => {
//   console.log(`Tour id is ${val}`);
//   if (req.params.id > tours.length) {
//     return res.status(404).json({
//       status: 'Failed',
//       message: 'Invalid ID [no data for that ID]',
//     });
//   }
//   next();
// };
// exports.checkBody = (req, res, next) => {
//   if (!req.body.name || !req.body.price) {
//     return res.status(400).json({
//       status: 'fail',
//       message: 'Missing name or price',
//     });
//   }
//   next();
// };

exports.getAllTour = (req, res) => {
  res.status(200).json({
    status: 'Success',
    requestedAt: req.requestTime,
    // result: tours.length,
    // data: {
    //   tours,
    // },
  });
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err.message,
    });
  }
};
exports.getTour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;
  // if (id > tours.length) {
  //   return res.status(404).json({
  //     status: 'Failed',
  //     message: 'Invalid ID',
  //   });
  // }
  // const tour = tours.find((el) => el.id === id);
  // if (!tour) {
  //   return res.status(404).json({
  //     status: 'Failed',
  //     message: 'Invalid ID',
  //   });
  // }
  res.status(200).json({
    status: 'Success',
    // result: tours.length,
    // data: {
    //   tour,
    // },
  });
};

exports.updateTour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;
  // if (id > tours.length) {
  //   return res.status(404).json({
  //     status: 'Failed',
  //     message: 'Invalid ID',
  //   });
  // }
  res.status(200).json({
    status: 'Success',
    data: {
      tour: '<Updated tours here>',
    },
  });
};

exports.deleteTour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;
  // if (id > tours.length) {
  //   return res.status(404).json({
  //     status: 'Failed',
  //     message: 'Invalid ID',
  //   });
  // }
  res.status(204).json({
    status: 'Success',
    data: null,
  });
};
