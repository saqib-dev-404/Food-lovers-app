const Products = require("../database/models/productModel");
const ErrorHandler = require("../utilis/errorHandling");
const CatchErrors = require("../middleware/catchAsyncError");

exports.getAllProducts = CatchErrors(async (req, res, next) => {
  const products = await Products.find();

  if (!products) {
    return next(new ErrorHandler("Not found Here!", 404));
  }

  res.status(200).json({
    status: "success",
    results: products.length,
    products,
  });
});

exports.postProduct = CatchErrors(async (req, res, next) => {
  const product = await Products(req.body);
  product.save((err, product) => {
    if (err) {
      return next(new ErrorHandler(err.message, 400));
    }
    res.status(201).json({
      product,
    });
  });
});
exports.updateProduct = CatchErrors(async (req, res, next) => {
  const product = await Products.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  if (!product) {
    return next(new ErrorHandler("Product not found and update", 404));
  }
  res.status(200).json({
    success: true,
    product,
  });
});

exports.deleteProduct = CatchErrors(async (req, res, next) => {
  const product = await Products.findByIdAndDelete(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found and delete", 404));
  }

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});
exports.getSingleProduct = CatchErrors(async (req, res, next) => {
  const product = await Products.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});
