const Tour = require('../models/tourModel');

exports.getAllTour = async (req, res) => {
  try {
    const queryObj = { ...req.query };
    const excludedFiels = ['page', 'sort', 'limit', 'fields'];
    excludedFiels.forEach((el) => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    const newQueryStr = JSON.parse(queryStr);
    let query = Tour.find(newQueryStr);
    //SORTING IMPLEMENTATION
    // if (req.query.sort) {
    //http://localhost:5000/api/v1/tours?sort=price will sort in asc order
    //http://localhost:5000/api/v1/tours?sort=-price will sort in desc order
    //   query = query.sort(req.query.sort);
    // }

    //ADVANCE SORTING IMPLEMENTATION
    if (req.query.sort) {
      //http://localhost:5000/api/v1/tours?sort=-price,ratingsAverage
      // http://localhost:5000/api/v1/tours?sort=-price,-ratingsAverage
      // http://localhost:5000/api/v1/tours?sort=price,-ratingsAverage
      // http://localhost:5000/api/v1/tours?sort=price,ratingsAverage
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }
    // FIELD LIMITING
    //http://localhost:5000/api/v1/tours?fields=name,duration,difficulty,price
    //http://localhost:5000/api/v1/tours?fields=-name,-duration its exclude name and duration and give
    // all respose back
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      // the mongoose each data contains __v as 0 mongoDB created this filed,
      // mongoDb used it internally, but we can disbale them
      // -__v disbale them by not sending it as response to client
      query = query.select('-__v');
    }
    const tours = await query;
    res.status(200).json({
      status: 'success',
      result: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err.message,
    });
  }
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
exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err.message,
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err.message,
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: 'success',
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err.message,
    });
  }
};
