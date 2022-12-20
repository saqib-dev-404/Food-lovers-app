const express = require("express");

const user = require("../controller/userController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/Auth");

const router = express.Router();

router.route("/register").post(user.registerUser);
router.route("/login").post(user.loginUser);
router.route("/logout").get(user.logoutUser);
router.route("/me").get(isAuthenticatedUser, user.getUserProfile);
router.route("/password/forgot").post(user.forgetPassword);
router.route("/password/reset/:token").put(user.resetPassword);
router.route("/password/update").put(isAuthenticatedUser, user.updatePassword);
router.route("/me/update").put(isAuthenticatedUser, user.updateProfile);
router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizeRoles("admin"), user.allUsers);
router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), user.getUserDetails)
  .put(isAuthenticatedUser, authorizeRoles("admin"), user.updateUser)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), user.deleteUser);

module.exports = router;
