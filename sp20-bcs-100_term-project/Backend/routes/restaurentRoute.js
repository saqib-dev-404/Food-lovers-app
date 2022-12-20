const express = require("express");

const restaurent = require("../controller/restaurentController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/Auth");

const router = express.Router();

router.route("/restaurents").get(restaurent.getAllRestaurents);
router
  .route("/restaurent/new")
  .post(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    restaurent.postRestaurent
  );
router
  .route("/restaurent/:id")
  .put(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    restaurent.updateRestaurent
  )
  .delete(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    restaurent.deleteRestaurent
  )
  .get(restaurent.getSingleRestaurent);

router
  .route("/review")
  .put(isAuthenticatedUser, restaurent.createRestaurentReview);

router
  .route("/reviews")
  .get(restaurent.getAllReviews)
  .delete(isAuthenticatedUser, restaurent.deleteReview);

module.exports = router;
