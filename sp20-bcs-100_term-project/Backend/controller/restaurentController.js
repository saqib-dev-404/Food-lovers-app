const Restaurents = require("../database/models/restaurentsModel");
const ErrorHandler = require("../utilis/errorHandling");
const CatchErrors = require("../middleware/catchAsyncError");

exports.getAllRestaurents = CatchErrors(async (req, res, next) => {
  const restaurents = await Restaurents.find();

  if (!restaurents) {
    return next(new ErrorHandler("Not found Here!", 404));
  }

  res.status(200).json({
    status: "success",
    results: restaurents.length,
    restaurents,
  });
});

exports.postRestaurent = CatchErrors(async (req, res, next) => {
  req.body.user = req.user.id;
  const restaurent = await Restaurents.create(req.body);

  if (!restaurent) {
    return next(new ErrorHandler("Cannot add restaurent!", 404));
  }

  res.status(201).json({
    success: true,
    restaurent,
  });
});

exports.updateRestaurent = CatchErrors(async (req, res, next) => {
  req.body.user = req.user.id;
  const restaurent = await Restaurents.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  if (!restaurent) {
    return next(new ErrorHandler("Restaurent not found and update", 404));
  }
  res.status(200).json({
    success: true,
    restaurent,
  });
});

exports.deleteRestaurent = CatchErrors(async (req, res, next) => {
  const restaurent = await Restaurents.findByIdAndDelete(req.params.id);

  if (!restaurent) {
    return next(new ErrorHandler("Restaurent not found and delete", 404));
  }

  res.status(200).json({
    success: true,
    message: "Restaurent deleted successfully",
  });
});

exports.getSingleRestaurent = CatchErrors(async (req, res, next) => {
  const restaurent = await Restaurents.findById(req.params.id);

  if (!restaurent) {
    return next(new ErrorHandler("Restaurent not found", 404));
  }

  res.status(200).json({
    success: true,
    restaurent,
  });
});

exports.createRestaurentReview = CatchErrors(async (req, res, next) => {
  const { rating, comment, restaurentID } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const restaurent = await Restaurents.findById(restaurentID);

  const isReviewed = restaurent.reviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    restaurent.reviews.forEach((review) => {
      if (review.user.toString() === req.user._id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    restaurent.reviews.push(review);
    restaurent.numOfReviews = restaurent.reviews.length;
  }

  restaurent.ratings = restaurent.reviews.reduce(
    (acc, item) => item.rating + acc,
    0
  );
  await restaurent.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

exports.getAllReviews = CatchErrors(async (req, res, next) => {
  const restaurent = await Restaurents.findById(req.params.id);

  if (!restaurent) {
    return next(new ErrorHandler("Restaurent not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: restaurent.reviews,
  });
});

exports.deleteReview = CatchErrors(async (req, res, next) => {
  const restaurent = await Restaurents.findById(req.params.id);

  const reviews = restaurent.reviews.filter(
    (review) => review._id.toString() !== req.query.id.toString()
  );

  const numOfReviews = reviews.length;

  const ratings =
    restaurent.reviews.reduce((acc, item) => item.rating + acc, 0) /
    reviews.length;

  await Restaurents.findByIdAndUpdate(
    req.params.id,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});
