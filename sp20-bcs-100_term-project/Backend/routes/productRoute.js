const express = require("express");
const {
  getAllProducts,
  postProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
} = require("../controller/productController");
const router = express.Router();

router.route("/products").get(getAllProducts);

router.route("/product/new").post(postProduct);

router
  .route("/product/:id")
  .put(updateProduct)
  .delete(deleteProduct)
  .get(getSingleProduct);

module.exports = router;
