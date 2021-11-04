const Tour = require('../models/tourModel');

exports.getAllTour = async (req, res) => {
  try {
    //QUERY FILTERING #1
    // console.log(req.query);
    // const tours = await Tour.find({
    //   difficulty: req.query.difficulty,
    //   duration: req.query.duration,
    // });
    //BUILDING QUERY
    //FILTERING
    const queryObj = { ...req.query };
    const excludedFiels = ['page', 'sort', 'limit', 'fields'];
    excludedFiels.forEach((el) => delete queryObj[el]);
    //ADVANCE FILTERINg
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    // /\b(gte|gt|lte|lt)\b/g, Regular expression for query operator and replace with $gte if g is not mention then it will check for first match if g is mentioned it will check for all macth
    const newQueryStr = JSON.parse(queryStr);
    // console.log(newQueryStr);
    // {
    //   duration: { '$gte': '5' },
    //   difficulty: 'easy',
    //   price: { '$lt': '1500' }
    // }
    // GET /api/v1/tours?duration[gte]=5&&difficulty=easy&price[lt]=1500
    const query = Tour.find(newQueryStr);
    //EXECUTE QUERY
    const tours = await query;
    // req.query :{
    //   difficulty: 'easy',
    //   duration: '5',
    //   sort: '3',
    //   page: '10',
    //   limit: '20'
    // }
    // queryObj after delete{ difficulty: 'easy', duration: '5' }
    // console.log(req.query, queryObj);
    // const tours = await Tour.find(queryObj);

    //QUERY FILTERING #2
    // const tours = await Tour.find(req.query);

    //QUERY FILTERING #3
    // const tours = await Tour.find()
    //   .where('difficulty')
    //   .lte(req.query.difficulty)
    //   .where('duration')
    //   .equals(req.query.duration);

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
